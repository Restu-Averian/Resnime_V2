import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Bindings } from './types/bindings';
import { successResponse, errorResponse } from './utils/response';
import healthRouter from './routes/health';
import readyRouter from './routes/ready';
import homeRouter from './routes/home';

const app = new Hono<{ Bindings: Bindings }>();

app.use(
	'*',
	cors({
		origin: ['http://localhost:5173', 'https://resnime.my.id', 'https://www.resnime.my.id'],
		allowMethods: ['GET', 'POST', 'OPTIONS'],
		allowHeaders: ['Content-Type', 'Authorization'],
		maxAge: 86400,
		credentials: false,
	}),
);

app.get('/', (c) => {
	return c.json(
		successResponse({
			service: 'resnime-api',
			version: 'v1',
			status: 'running',
		}),
	);
});

app.route('/health', healthRouter);
app.route('/ready', readyRouter);
app.route('/api/home', homeRouter);

app.notFound((c) => {
	return c.json(errorResponse('NOT_FOUND', 'Route not found'), 404);
});

app.onError((err, c) => {
	console.error(err);
	return c.json(errorResponse('INTERNAL_SERVER_ERROR', 'An unexpected error occurred'), 500);
});

export default app;
