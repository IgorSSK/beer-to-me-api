export class AwsLambdaException {
	constructor(public message: string) {}
}

export class AwsLambdaResponse<T> {
	statusCode: number;
	data?: T;
	headers?: object;
	exception?: AwsLambdaException;
}

export interface IAwsLambda {
	invoke: <T>(functionName: string, payload: any) => Promise<AwsLambdaResponse<T>>;
}
