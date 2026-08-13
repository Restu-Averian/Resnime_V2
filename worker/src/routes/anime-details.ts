import { Hono, type Context } from 'hono';
import { createDatabaseClient } from '../db/client';
import type { Bindings } from '../types/bindings';
import { errorResponse } from '../utils/response';

const animeDetailsRouter = new Hono<{ Bindings: Bindings }>();

const ANIME_DETAILS_DEFAULT_LIMIT = 24;
const ANIME_DETAILS_MAX_LIMIT = 50;
const ANIME_DETAILS_MONTHS: Record<string, string> = {
	Jan: '01',
	Feb: '02',
	Mar: '03',
	Apr: '04',
	May: '05',
	Jun: '06',
	Jul: '07',
	Aug: '08',
	Sep: '09',
	Oct: '10',
	Nov: '11',
	Dec: '12',
};

type AnimeDetailsRow = {
	id: string;
	title_en: string | null;
	title_romaji: string | null;
	type: string | null;
	status: string | null;
	season: string | null;
	rating: number | null;
	studio: string | null;
	description: string | null;
	photo: string | null;
	banner_bg_img: string | null;
	genres: string | null;
	aired: string | null;
};

type EpisodeRow = {
	episode_number: number;
	thumbnail_url: string | null;
	aired_at: string | null;
};

type CharacterVoiceRow = {
	character_id: string;
	name: string;
	role: string | null;
	photo: string | null;
	voice_actor_id: string | null;
	voice_actor_name: string | null;
	voice_actor_photo: string | null;
	country: string | null;
};

type AnimeDetailsContext = Context<{ Bindings: Bindings }>;

const parseMalId = (value: string | undefined): number | null => {
	if (!value || !/^\d+$/.test(value)) {
		return null;
	}

	const id = Number(value);
	return Number.isSafeInteger(id) && id > 0 ? id : null;
};

const parsePagination = (pageValue: string | undefined, limitValue: string | undefined) => {
	let page = Number(pageValue);
	if (!Number.isSafeInteger(page) || page <= 0) page = 1;

	let limit = Number(limitValue);
	if (!Number.isSafeInteger(limit) || limit <= 0) limit = ANIME_DETAILS_DEFAULT_LIMIT;
	if (limit > ANIME_DETAILS_MAX_LIMIT) limit = ANIME_DETAILS_MAX_LIMIT;

	return {
		page,
		limit,
		offset: (page - 1) * limit,
	};
};

const parseGenres = (value: unknown): string[] => {
	if (typeof value !== 'string') {
		return [];
	}

	try {
		const parsed: unknown = JSON.parse(value);
		return Array.isArray(parsed) ? parsed.filter((genre): genre is string => typeof genre === 'string') : [];
	} catch {
		return [];
	}
};

const parseAiredDate = (value: string | undefined): string | null => {
	if (!value) {
		return null;
	}

	const trimmedValue = value.trim();
	const isoDateMatch = trimmedValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (isoDateMatch) {
		return new Date(`${trimmedValue}T00:00:00Z`).toISOString();
	}

	const match = trimmedValue.match(/^([A-Za-z]{3})\s+(\d{1,2}),\s+(\d{4})$/);
	if (!match) {
		return null;
	}

	const [, monthName, day, year] = match;
	const month = ANIME_DETAILS_MONTHS[monthName];
	if (!month) {
		return null;
	}

	return new Date(`${year}-${month}-${day.padStart(2, '0')}T00:00:00Z`).toISOString();
};

const parseAired = (value: string | null, season: string | null) => {
	const [fromValue, toValue] = value?.split(' to ') ?? [];
	const airedFrom = parseAiredDate(fromValue);
	const airedTo = parseAiredDate(toValue);
	const seasonYear = season?.match(/\b(\d{4})\b/)?.[1];
	const year = airedFrom ? new Date(airedFrom).getUTCFullYear() : seasonYear ? Number(seasonYear) : null;

	return {
		aired_from: airedFrom,
		aired_to: airedTo,
		year,
	};
};

const databaseUnavailable = (c: AnimeDetailsContext) => {
	console.error('Anime details database unavailable.');
	return c.json(errorResponse('DATABASE_UNAVAILABLE', 'Database is temporarily unavailable'), 503);
};

const invalidMalId = (c: AnimeDetailsContext) => {
	return c.json(errorResponse('INVALID_MAL_ID', 'MAL ID must be a positive number'), 400);
};

animeDetailsRouter.use('*', async (c, next) => {
	await next();

	c.header('Cache-Control', 'no-store');
});

animeDetailsRouter.get('/', async (c) => {
	const malId = parseMalId(c.req.param('mal_id'));
	if (!malId) {
		return invalidMalId(c);
	}

	if (!c.env.TURSO_DATABASE_URL || !c.env.TURSO_AUTH_TOKEN) {
		return databaseUnavailable(c);
	}

	try {
		const dbClient = createDatabaseClient(c.env);
		const [animeResult, episodeCountResult] = await Promise.all([
			dbClient.execute({
				sql: `
					SELECT
						id,
						title_en,
						title_romaji,
						type,
						status,
						season,
						rating,
						studio,
						description,
						photo,
						banner_bg_img,
						genres,
						aired
					FROM anime_info
					WHERE id = ?
					LIMIT 1
				`,
				args: [String(malId)],
			}),
			dbClient.execute({
				sql: 'SELECT COUNT(*) AS total FROM episodes WHERE anime_id = ?',
				args: [String(malId)],
			}),
		]);

		const row = animeResult.rows[0] as unknown as AnimeDetailsRow | undefined;
		if (!row) {
			return c.json(errorResponse('ANIME_NOT_FOUND', 'Anime not found'), 404);
		}

		const aired = parseAired(row.aired, row.season);

		return c.json({
			id: Number(row.id),
			title_en: row.title_en,
			title_romaji: row.title_romaji,
			type: row.type,
			status: row.status,
			episodes_count: Number(episodeCountResult.rows[0]?.total ?? 0),
			season: row.season,
			year: aired.year,
			aired_from: aired.aired_from,
			aired_to: aired.aired_to,
			score: row.rating === null ? null : Number(row.rating),
			studio: row.studio,
			synopsis: row.description,
			photo: row.photo,
			banner_bg_img: row.banner_bg_img,
			genres: parseGenres(row.genres),
		});
	} catch {
		return databaseUnavailable(c);
	}
});

animeDetailsRouter.get('/episodes', async (c) => {
	const malId = parseMalId(c.req.param('mal_id'));
	if (!malId) {
		return invalidMalId(c);
	}

	if (!c.env.TURSO_DATABASE_URL || !c.env.TURSO_AUTH_TOKEN) {
		return databaseUnavailable(c);
	}

	const { page, limit, offset } = parsePagination(c.req.query('page'), c.req.query('limit'));

	try {
		const dbClient = createDatabaseClient(c.env);
		const [countResult, itemsResult] = await Promise.all([
			dbClient.execute({
				sql: 'SELECT COUNT(*) AS total FROM episodes WHERE anime_id = ?',
				args: [String(malId)],
			}),
			dbClient.execute({
				sql: `
					SELECT episode_number, thumbnail_url, aired_at
					FROM episodes
					WHERE anime_id = ?
					ORDER BY episode_number ASC
					LIMIT ? OFFSET ?
				`,
				args: [String(malId), limit, offset],
			}),
		]);

		const items = (itemsResult.rows as unknown as EpisodeRow[]).map((row) => ({
			episode_number: Number(row.episode_number),
			thumbnail_url: row.thumbnail_url,
			aired_at: row.aired_at,
		}));

		return c.json({
			items,
			pagination: {
				page,
				limit,
				total: Number(countResult.rows[0]?.total ?? 0),
			},
		});
	} catch {
		return databaseUnavailable(c);
	}
});

animeDetailsRouter.get('/characters', async (c) => {
	const malId = parseMalId(c.req.param('mal_id'));
	if (!malId) {
		return invalidMalId(c);
	}

	if (!c.env.TURSO_DATABASE_URL || !c.env.TURSO_AUTH_TOKEN) {
		return databaseUnavailable(c);
	}

	const { page, limit, offset } = parsePagination(c.req.query('page'), c.req.query('limit'));

	try {
		const dbClient = createDatabaseClient(c.env);
		const [countResult, rowsResult] = await Promise.all([
			dbClient.execute({
				sql: 'SELECT COUNT(*) AS total FROM anime_characters WHERE anime_id = ?',
				args: [String(malId)],
			}),
			dbClient.execute({
				sql: `
					SELECT
						ac.character_id,
						c.name,
						ac.role,
						c.photo,
						va.id AS voice_actor_id,
						va.name AS voice_actor_name,
						va.photo AS voice_actor_photo,
						va.country
					FROM (
						SELECT *
						FROM anime_characters
						WHERE anime_id = ?
						ORDER BY CASE role WHEN 'Main' THEN 0 ELSE 1 END, id ASC
						LIMIT ? OFFSET ?
					) ac
					JOIN characters c ON c.id = ac.character_id
					LEFT JOIN character_voice_actors cva ON cva.anime_character_id = ac.id
					LEFT JOIN voice_actors va ON va.id = cva.voice_actor_id
					ORDER BY CASE ac.role WHEN 'Main' THEN 0 ELSE 1 END, c.name COLLATE NOCASE ASC, va.country = 'Japan' DESC, va.name COLLATE NOCASE ASC
				`,
				args: [String(malId), limit, offset],
			}),
		]);

		const characterMap = new Map<
			string,
			{
				character_id: string;
				name: string;
				role: string | null;
				photo: string | null;
				voice_actors: Array<{ id: string; name: string; photo: string | null; country: string | null }>;
			}
		>();

		for (const row of rowsResult.rows as unknown as CharacterVoiceRow[]) {
			if (!characterMap.has(row.character_id)) {
				characterMap.set(row.character_id, {
					character_id: row.character_id,
					name: row.name,
					role: row.role,
					photo: row.photo,
					voice_actors: [],
				});
			}

			if (row.voice_actor_id && row.voice_actor_name) {
				characterMap.get(row.character_id)?.voice_actors.push({
					id: row.voice_actor_id,
					name: row.voice_actor_name,
					photo: row.voice_actor_photo,
					country: row.country,
				});
			}
		}

		return c.json({
			items: Array.from(characterMap.values()),
			pagination: {
				page,
				limit,
				total: Number(countResult.rows[0]?.total ?? 0),
			},
		});
	} catch {
		return databaseUnavailable(c);
	}
});

export default animeDetailsRouter;
