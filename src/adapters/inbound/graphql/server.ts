import express from 'express';
import { graphql } from './graphql';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiGatewayMiddleware } from '../middlewares/ApiGatewayMiddleware';
import { ExpressContext } from 'apollo-server-express';
import GraphqlServer from '@infrastructure/implementations/GraphqlServer';
import Logger from '@common/helpers/Logger';

const PORT = process.env.PORT || 4000;

async function serve() {
	const app = express();
	const graphqlSchema = await graphql();
	const graphqlContext = ({ req }: ExpressContext) => ApiGatewayMiddleware(req);

	const server = await new GraphqlServer<ExpressContext, APIGatewayProxyEvent>(
		graphqlSchema,
		graphqlContext
	).server();

	app.use(express.json({ limit: '50mb' }));
	app.use(server);
	app.listen(PORT);

	Logger.info(`Server is running, GraphQL Playground available at ${PORT}!`);
}

serve();
