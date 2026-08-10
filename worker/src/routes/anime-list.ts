import { Hono } from 'hono';
import { Bindings } from '../types/bindings';
import { errorResponse } from '../utils/response';
import { createDatabaseClient } from '../db/client';

const animeListRouter = new Hono<{ Bindings: Bindings }>();

const orderByMap: Record<string, string> = {
	highest_rated: 'rating DESC, title_en COLLATE NOCASE ASC',
	latest: 'updated_at DESC',
	a_z: 'title_en COLLATE NOCASE ASC',
	z_a: 'title_en COLLATE NOCASE DESC',
};

animeListRouter.use('*', async (c, next) => {
	await next();
	c.header('Cache-Control', 'no-store');
});

animeListRouter.get('/', async (c) => {
	if (!c.env.TURSO_DATABASE_URL || !c.env.TURSO_AUTH_TOKEN) {
		console.error('Turso local credentials must be configured.');
		return c.json(errorResponse('DATABASE_UNAVAILABLE', 'Database is temporarily unavailable'), 503);
	}

	const tab = c.req.query('tab') || 'all';
	if (tab !== 'all') {
		return c.json(
			{
				success: false,
				error: {
					code: 'UNSUPPORTED_TAB',
					message: 'This anime list tab is not supported yet',
				},
			},
			400,
		);
	}

	let page = Number(c.req.query('page'));
	if (isNaN(page) || page <= 0) page = 1;

	let limit = Number(c.req.query('limit'));
	if (isNaN(limit) || limit <= 0) limit = 20;
	if (limit > 50) limit = 50;

	const offset = (page - 1) * limit;

	const search = c.req.query('search')?.trim();
	const genre = c.req.query('genre')?.trim();
	const type = c.req.query('type')?.trim();
	const status = c.req.query('status')?.trim();
	const season = c.req.query('season')?.trim();
	const orderParam = c.req.query('order')?.trim() || 'highest_rated';

	const orderSql = orderByMap[orderParam] || orderByMap['highest_rated'];

	const conditions: string[] = [];
	const args: any[] = [];

	if (search) {
		conditions.push(`(title_en COLLATE NOCASE LIKE ? OR title_romaji COLLATE NOCASE LIKE ? OR title_native COLLATE NOCASE LIKE ?)`);
		const searchPattern = `%${search}%`;
		args.push(searchPattern, searchPattern, searchPattern);
	}

	if (genre) {
		conditions.push(`EXISTS (SELECT 1 FROM json_each(anime_info.genres) AS genre_item WHERE genre_item.value = ?)`);
		args.push(genre);
	}

	if (type) {
		conditions.push(`type = ?`);
		args.push(type);
	}

	if (status) {
		conditions.push(`status = ?`);
		args.push(status);
	}

	if (season) {
		conditions.push(`season = ?`);
		args.push(season);
	}

	const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

	const itemsSql = `
		SELECT id, title_en, title_romaji, rating, type, photo
		FROM anime_info
		${whereClause}
		ORDER BY ${orderSql}
		LIMIT ? OFFSET ?
	`;

	const countSql = `
		SELECT COUNT(*) AS total
		FROM anime_info
		${whereClause}
	`;

	const itemsArgs = [...args, limit, offset];
	const countArgs = [...args];

	const dbClient = createDatabaseClient(c.env);

	try {
		const [itemsResult, countResult] = await Promise.all([
			dbClient.execute({ sql: itemsSql, args: itemsArgs }),
			dbClient.execute({ sql: countSql, args: countArgs }),
		]);

		const total = Number(countResult.rows[0]?.total ?? 0);
		const totalPages = Math.ceil(total / limit);

		const items = itemsResult.rows.map((row) => ({
			id: String(row.id),
			title_en: String(row.title_en),
			title_romaji: String(row.title_romaji),
			rating: Number(row.rating),
			type: String(row.type),
			photo: String(row.photo),
		}));

		return c.json({
			items,
			pagination: {
				page,
				limit,
				total,
				total_pages: totalPages,
			},
		});
	} catch (error) {
		console.error('Database query failed:', error);
		return c.json(errorResponse('DATABASE_UNAVAILABLE', 'Database is temporarily unavailable'), 503);
	}
});

export default animeListRouter;
