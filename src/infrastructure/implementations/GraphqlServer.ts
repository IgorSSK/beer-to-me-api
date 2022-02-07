import { ContextFunction } from 'apollo-server-core';
import { ApolloServer as ApolloServerExpress, ExpressContext } from 'apollo-server-express';
import { ApolloServer as ApolloServerLambda } from 'apollo-server-lambda';
import { LambdaContextFunctionParams } from 'apollo-server-lambda/dist/ApolloServer';
import { Handler } from 'aws-lambda';
import express from 'express';
import { GraphQLSchema } from 'graphql';
import IGraphqlServer from '../interfaces/IGraphqlServer';

class GraphqlServer<
	TContextFunction = ExpressContext | LambdaContextFunctionParams,
	TContextResponse = object
> implements IGraphqlServer<Handler<any, any>, Promise<express.Router>>
{
	private apolloServer: ApolloServerLambda | ApolloServerExpress;
	private schema: GraphQLSchema;
	private context?: ContextFunction<TContextFunction, TContextResponse>;

	constructor(
		graphqlSchema: GraphQLSchema,
		graphqlContext?: ContextFunction<TContextFunction, TContextResponse>
	) {
		this.schema = graphqlSchema;
		this.context = graphqlContext ? graphqlContext : undefined;
	}

	handler(): Handler {
		this.apolloServer = new ApolloServerLambda({
			schema: this.schema,
			context: this.context
		});

		return this.apolloServer.createHandler();
	}

	async server(): Promise<express.Router> {
		this.apolloServer = new ApolloServerExpress<ExpressContext>({
			schema: this.schema,
			context: this.context
		});

		await this.apolloServer.start();
		return this.apolloServer.getMiddleware();
	}
}

export default GraphqlServer;
