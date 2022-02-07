import Logger from '@common/helpers/Logger';
import { ResolverData } from 'type-graphql';
import { MiddlewareInterface, NextFn } from 'type-graphql/dist/interfaces/Middleware';

export default class ErrorMiddleware implements MiddlewareInterface {
	async use(_: ResolverData<{}>, next: NextFn): Promise<any> {
		try {
			return await next();
		} catch (error) {
			Logger.error(error.message, error);
			throw error;
		}
	}
}
