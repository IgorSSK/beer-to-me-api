import Publishment from '@application/domain/entities/Publishment';
import PublishmentRepositoryPort from '@application/ports/outbound/PublishmentRepositoryPort';
import AwsDynamoDB from '@infrastructure/implementations/AwsDynamo';
import IDatabase from '@infrastructure/interfaces/IDatabase';

class PublishmentRepositoryAdapter implements PublishmentRepositoryPort {
	private _database: IDatabase<Publishment>;

	constructor() {
		this._database = new AwsDynamoDB('Publishment');
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
}

export default PublishmentRepositoryAdapter;
