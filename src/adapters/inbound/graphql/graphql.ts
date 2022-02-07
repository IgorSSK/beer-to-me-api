import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import ErrorMiddleware from '../middlewares/ErrorMiddleware';

export const graphql = async () =>
	await buildSchema({
		resolvers: [__dirname + '**/resolvers/**.{ts,js}'],
		globalMiddlewares: [ErrorMiddleware]
	});
