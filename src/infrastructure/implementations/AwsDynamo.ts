import { DynamoDB, ScanCommandInput } from '@aws-sdk/client-dynamodb';
import IDatabase from '@infrastructure/interfaces/IDatabase';
import { convertDynamoToObject, convertObjectToDynamo } from '@common/helpers/Converter';
import Logger from '@common/helpers/Logger';

class AwsDynamoDB<TEntity> implements IDatabase<TEntity> {
	private _client: DynamoDB;
	private _tableName: string;

	constructor(tableName: string) {
		this._client = new DynamoDB({});
		this._tableName = tableName;
	}

	async selectById(id: any): Promise<TEntity | undefined> {
		try {
			if (!id) throw new Error('Must provide a valid ID!');

			const key = convertObjectToDynamo({ id });

			Logger.info(`[Infra] Table: ${this._tableName} | Key: `, key);

			const output = await this._client.getItem({ TableName: this._tableName, Key: key });

			return output.Item && (convertDynamoToObject(output.Item) as TEntity);
		} catch (error) {
			Logger.error(`[Infra] ${error.message}`, error);
			throw error;
		}
	}

	async select(id?: any, query?: ScanCommandInput): Promise<TEntity[]> {
		try {
			Logger.info(`[Infra] Table: ${this._tableName} | Key: ${id} | Query: ${query}`);

			if (!id && !query) {
				const output = await this._client.scan({ TableName: this._tableName });
				return (output.Items?.map(item => convertDynamoToObject(item)) as TEntity[]) || [];
			} else if (query) {
				const output = await this._client.query({ TableName: this._tableName });
				return (output?.Items as unknown as TEntity[]) || [];
			}

			throw new Error('could not proceed with the operation.');
		} catch (error) {
			Logger.error(`[Infra] ${error.message}`, error);
			throw error;
		}
	}

	async insert(obj: TEntity): Promise<void> {
		try {
			if (!obj) throw new Error('Object is not valid!');

			const item = convertObjectToDynamo(obj);

			Logger.info(`Table: ${this._tableName} | Item: `, item);

			await this._client.putItem({
				TableName: this._tableName,
				Item: item
			});

			return;
		} catch (error) {
			Logger.error(`[Infra] ${error.message}`, error);
			throw error;
		}
	}

	async update(id: any, obj: TEntity): Promise<void> {
		try {
			const key = convertObjectToDynamo({ id });
			const item = convertObjectToDynamo(obj);

			let updateExpression = 'set';
			let expressionAttributeValues = {};
			let expressionAttributeNames = {};

			Object.entries(obj).map(([key, value], index, array) => {
				if (value === id) return;
				expressionAttributeNames = { ...expressionAttributeNames, [`#${index}`]: key };
				updateExpression += ` #${index} = :${key}${array.length - 1 !== index ? ',' : ''}`;
				expressionAttributeValues = {
					...expressionAttributeValues,
					[`:${key}`]: item[key]
				};
			});

			Logger.info(`[Infra] Table: ${this._tableName} | Key: ${id}`);
			Logger.info(`[Infra] UpdateExpression: ${updateExpression}`);
			Logger.info('[Infra] Expression Attribute Names: ', expressionAttributeNames);
			Logger.info('[Infra] Expression Attribute Values: ', expressionAttributeValues);

			await this._client.updateItem({
				TableName: this._tableName,
				Key: key,
				UpdateExpression: updateExpression,
				ExpressionAttributeValues: expressionAttributeValues,
				ExpressionAttributeNames: expressionAttributeNames
			});

			return;
		} catch (error) {
			Logger.error(`[Infra] ${error.message}`, error);
			throw error;
		}
	}

	async delete(id: any): Promise<void> {
		throw new Error('Method not implemented.' + id);
	}
}

export default AwsDynamoDB;
