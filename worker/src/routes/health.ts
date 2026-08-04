import { Hono } from 'hono';
import { Bindings } from '../types/bindings';
import { successResponse } from '../utils/response';

const healthRouter = new Hono<{ Bindings: Bindings }>();

healthRouter.get('/', (c) => {
	return c.json(
		successResponse({
			service: 'resnime-api',
			status: 'ok',
			timestamp: new Date().toISOString(),
		}),
	);
});

export default healthRouter;
