import { Hono } from 'hono';
import { Bindings } from '../types/bindings';
import { createDatabaseClient } from '../db/client';
import { checkDatabaseReadiness } from '../db/readiness';
import { successResponse, errorResponse } from '../utils/response';

const readyRouter = new Hono<{ Bindings: Bindings }>();

readyRouter.use('*', async (c, next) => {
	await next();
	c.header('Cache-Control', 'no-store');
});

readyRouter.get('/', async (c) => {
	if (!c.env.TURSO_DATABASE_URL || !c.env.TURSO_AUTH_TOKEN) {
		console.error('Turso local credentials must be configured.');
		return c.json(errorResponse('DATABASE_UNAVAILABLE', 'Database is temporarily unavailable'), 503);
	}

	try {
		const dbClient = createDatabaseClient(c.env);
		const result = await dbClient?.execute('SELECT title_en FROM anime_info LIMIT 5');
		// await checkDatabaseReadiness(dbClient);

		return c.json(
			successResponse({
				service: 'resnime-api',
				status: 'ready',
				database: 'connected',
				timestamp: new Date().toISOString(),
				result,
			}),
		);
	} catch (err) {
		console.error('Turso readiness check failed');
		return c.json(errorResponse('DATABASE_UNAVAILABLE', 'Database is temporarily unavailable'), 503);
	}
});

export default readyRouter;
