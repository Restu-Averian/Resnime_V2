import { Hono } from 'hono';
import { errorResponse, successResponse } from '../utils/response';
import { createDatabaseClient } from '../db/client';
import type { Bindings } from '../types/bindings';

const homeRouter = new Hono<{ Bindings: Bindings }>();

const FEATURED_ANIME_ID = '59978';

const TONIGHTS_PICK_IDS = ['57658', '55825', '60058', '56009'] as const;

type FeaturedRow = {
	id: string;
	title_en: string;
	title_romaji: string;
	type: string;
	genres: string;
	description: string;
	banner_bg_img: string;
	photo: string;
};

type TonightPickRow = {
	id: string;
	title_en: string;
	title_romaji: string;
	rating: number;
	type: string;
	photo: string;
};

type GenreRow = {
	name: string;
	anime_count: number;
};

const parseGenres = (value: unknown): string[] => {
	if (typeof value !== 'string') {
		return [];
	}

	try {
		const parsed: unknown = JSON.parse(value);

		if (!Array.isArray(parsed)) {
			return [];
		}

		return parsed.filter((genre): genre is string => typeof genre === 'string');
	} catch {
		return [];
	}
};

const logQueryFailure = (section: 'featured' | 'tonights_picks' | 'genres'): void => {
	// Jangan log raw error karena bisa saja berisi detail internal database.
	console.error(`Home query failed: ${section}`);
};

homeRouter.use('*', async (c, next) => {
	await next();

	c.header('Cache-Control', 'no-store');
});

homeRouter.get('/', async (c) => {
	if (!c.env.TURSO_DATABASE_URL || !c.env.TURSO_AUTH_TOKEN) {
		console.error('Turso local credentials must be configured.');

		return c.json(errorResponse('DATABASE_UNAVAILABLE', 'Database is temporarily unavailable'), 503);
	}

	try {
		const dbClient = createDatabaseClient(c.env);

		const [featuredResult, tonightsPicksResult, genresResult] = await Promise.allSettled([
			dbClient.execute({
				sql: `
					SELECT
						id,
						title_en,
						title_romaji,
						type,
						genres,
						description,
						banner_bg_img,
						photo
					FROM anime_info
					WHERE id = ?
					LIMIT 1;
				`,
				args: [FEATURED_ANIME_ID],
			}),

			dbClient.execute({
				sql: `
					SELECT
						id,
						title_en,
						title_romaji,
						rating,
						type,
						photo
					FROM anime_info
					WHERE id IN (${TONIGHTS_PICK_IDS.map(() => '?').join(', ')});
				`,
				args: [...TONIGHTS_PICK_IDS],
			}),

			dbClient.execute(`
				SELECT
					genre.value AS name,
					COUNT(*) AS anime_count
				FROM anime_info
				CROSS JOIN json_each(anime_info.genres) AS genre
				GROUP BY genre.value
				ORDER BY anime_count DESC, name ASC
				LIMIT 3;
			`),
		]);

		const failedQueryCount = [featuredResult, tonightsPicksResult, genresResult].filter((result) => result.status === 'rejected').length;

		/*
		 * Kalau seluruh bagian gagal, response kosong akan menyesatkan.
		 * Lebih baik anggap database benar-benar unavailable.
		 */
		if (failedQueryCount === 3) {
			console.error('All home database queries failed.');

			return c.json(errorResponse('DATABASE_UNAVAILABLE', 'Database is temporarily unavailable'), 503);
		}

		/*
		 * FEATURED
		 */
		let featured: Record<string, unknown> = {};

		if (featuredResult.status === 'fulfilled') {
			const row = featuredResult.value.rows[0] as unknown as FeaturedRow | undefined;

			if (row) {
				featured = {
					id: Number(row.id),
					title_en: row.title_en,
					title_romaji: row.title_romaji,
					type: row.type,
					genres: parseGenres(row.genres),
					description: row.description,
					banner_bg_img: row.banner_bg_img,
					photo: row.photo,
				};
			}
		} else {
			logQueryFailure('featured');
		}

		/*
		 * TONIGHT'S PICKS
		 */
		let tonightsPicks: Array<{
			id: number;
			title_en: string;
			title_romaji: string;
			rating: number;
			type: string;
			photo: string;
		}> = [];

		if (tonightsPicksResult.status === 'fulfilled') {
			const rows = tonightsPicksResult.value.rows as unknown as TonightPickRow[];

			/*
			 * SQL IN (...) tidak menjamin urutan hasil.
			 * Susun ulang berdasarkan TONIGHTS_PICK_IDS.
			 */
			const rowById = new Map(rows.map((row) => [String(row.id), row]));

			tonightsPicks = TONIGHTS_PICK_IDS.flatMap((id) => {
				const row = rowById.get(id);

				if (!row) {
					return [];
				}

				return [
					{
						id: Number(row.id),
						title_en: row.title_en,
						title_romaji: row.title_romaji,
						rating: Number(row.rating),
						type: row.type,
						photo: row.photo,
					},
				];
			});
		} else {
			logQueryFailure('tonights_picks');
		}

		/*
		 * GENRES
		 */
		let genres: Array<{
			name: string;
			anime_count: number;
		}> = [];

		if (genresResult.status === 'fulfilled') {
			const rows = genresResult.value.rows as unknown as GenreRow[];

			genres = rows.map((row) => ({
				name: String(row.name),
				anime_count: Number(row.anime_count),
			}));
		} else {
			logQueryFailure('genres');
		}

		/*
		 * Bisa dipakai untuk observability/debugging.
		 * Frontend tidak wajib membaca header ini.
		 */
		if (failedQueryCount > 0) {
			c.header('X-Partial-Response', 'true');
		}

		return c.json(
			successResponse({
				featured,
				tonights_picks: tonightsPicks,
				genres,
			}),
			200,
		);
	} catch {
		/*
		 * Hanya untuk error yang terjadi di luar promise query,
		 * misalnya gagal membuat database client atau mapping tak terduga.
		 */
		console.error('Unexpected home endpoint failure.');

		return c.json(errorResponse('DATABASE_UNAVAILABLE', 'Database is temporarily unavailable'), 503);
	}
});

export default homeRouter;
