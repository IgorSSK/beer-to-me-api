import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';
import {
	AwsLambdaException,
	AwsLambdaResponse,
	IAwsLambda
} from '@infrastructure/interfaces/IAwsLambda';

export class AwsLambda implements IAwsLambda {
	private _lambda: LambdaClient;
	constructor() {
		this._lambda = new LambdaClient({});
	}

	async invoke<T>(_function: string, payload: any): Promise<AwsLambdaResponse<T>> {
		try {
			const params = new InvokeCommand({
				FunctionName: _function,
				LogType: 'Tail',
				Payload: new TextEncoder().encode(JSON.stringify(payload))
			});

			const response = await this._lambda.send(params);

			if (response.FunctionError) {
				throw new AwsLambdaException(response.FunctionError);
			}

			return this._handleResponse<T>(response.Payload);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	private _handleResponse<T>(payload?: Uint8Array): AwsLambdaResponse<T> {
		if (!payload) {
			return {
				statusCode: 404
			};
		}

		const convertedPayload = new TextDecoder().decode(payload);
		if (typeof convertedPayload === 'string') {
			const response = JSON.parse(convertedPayload);
			return {
				statusCode: response.statusCode,
				headers: response.headers,
				data: JSON.parse(response.body) as T
			};
		} else {
			return convertedPayload;
		}
	}
}
