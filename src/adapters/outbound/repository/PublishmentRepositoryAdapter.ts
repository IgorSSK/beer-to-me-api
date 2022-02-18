import Publishment from '@application/domain/entities/Publishment';
import PublishmentRepositoryPort from '@application/ports/outbound/PublishmentRepositoryPort';
import AwsDynamoDB from '@infrastructure/implementations/AwsDynamo';
import { AwsS3 } from '@infrastructure/implementations/AwsS3';
import IDatabase from '@infrastructure/interfaces/IDatabase';
import { IStorage } from '@infrastructure/interfaces/IStorage';

class PublishmentRepositoryAdapter implements PublishmentRepositoryPort {
	private _database: IDatabase<Publishment>;
	private _storage: IStorage;

	constructor() {
		this._database = new AwsDynamoDB('Publishment');
		this._storage = new AwsS3('publishments');
	}

	async create(obj: Publishment): Promise<void> {
		await this._database.insert(obj);
		return;
	}

	async findAll(): Promise<Publishment[]> {
		const rows = await this._database.select();
		return rows || [];
	}

	async findById(id: any): Promise<Publishment | undefined> {
		const row = await this._database.selectById(id);
		return row;
	}

	async update(id: string, obj: Publishment): Promise<void> {
		await this._database.update(id, obj);
		return;
	}

	async delete(id: any): Promise<void> {
		await this._database.delete(id);
		return;
	}

	async uploadPublishmentImage(
		key: string,
		body: Blob | Uint8Array | Buffer,
		contentType?: string
	): Promise<string> {
		await this._storage.createObject(key, body, contentType);

		return `https://publishments.s3.amazonaws.com/${key}`;
	}
}

export default PublishmentRepositoryAdapter;
