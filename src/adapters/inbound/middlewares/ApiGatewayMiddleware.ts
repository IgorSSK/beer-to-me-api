import { APIGatewayProxyEvent } from 'aws-lambda';
import { Request } from 'express';
// import jwt from 'jsonwebtoken';

export const ApiGatewayMiddleware = (request: Request): APIGatewayProxyEvent => {
	const event = request as unknown as APIGatewayProxyEvent;
	// event.headers = {
	// 	Authorization: String(request.headers.authorization),
	// 	token: String(request.headers.token)
	// };
	// event.requestContext.authorizer = {
	// 	...event.requestContext.authorizer,
	// 	principalId: (jwt.decode(String(request.headers.token)) as any)?.description
	// };

	return event;
	// if (['dev', 'hml', 'prd'].includes(String(process.env.ENVIRONMENT))) {
	// }
};
