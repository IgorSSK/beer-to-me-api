import { graphql } from './graphql';
import {
	APIGatewayProxyCallback,
	APIGatewayProxyEvent,
	APIGatewayProxyHandler,
	Context
} from 'aws-lambda';
import { LambdaContextFunctionParams } from 'apollo-server-lambda/dist/ApolloServer';
import GraphqlServer from '@infrastructure/implementations/GraphqlServer';
import Logger from '@common/helpers/Logger';

const graphqlHandler: APIGatewayProxyHandler = async (
	event: APIGatewayProxyEvent,
	context: Context,
	callback: APIGatewayProxyCallback
) => {
	try {
		const graphqlSchema = await graphql();
		const graphqlContext = () => event;

		const server = new GraphqlServer<LambdaContextFunctionParams, APIGatewayProxyEvent>(
			graphqlSchema,
			graphqlContext
		);

		const handlerResponse = await server.handler()(event, context, callback);
		Logger.info('Response: ', handlerResponse);
		return handlerResponse;
	} catch (error) {
		Logger.error(error.message, error);
		return {
			statusCode: 500,
			body: error.message
		};
	}
};

export { graphqlHandler };
