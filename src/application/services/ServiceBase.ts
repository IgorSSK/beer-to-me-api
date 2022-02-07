import IRepositoryBase from '@application/domain/interfaces/IRepositoryBase';
import Logger from '@common/helpers/Logger';
import IServiceBase from '../domain/interfaces/IServiceBase';

class ServiceBase<TEntity> implements IServiceBase<TEntity> {
	constructor(private _repository: IRepositoryBase<TEntity>) {}

	async create(obj: TEntity): Promise<void> {
		try {
			await this._repository.create(obj);
			return;
		} catch (error) {
			Logger.error(`[Service] ${error.message}`, error);
			throw error;
		}
	}

	async findAll(): Promise<TEntity[] | undefined> {
		try {
			return await this._repository.findAll();
		} catch (error) {
			Logger.error(`[Service] ${error.message}`, error);
			throw error;
		}
	}

	async findById(id: any): Promise<TEntity | undefined> {
		try {
			return await this._repository.findById(id);
		} catch (error) {
			Logger.error(`[Service] ${error.message}`, error);
			throw error;
		}
	}

	async update(id: string, obj: TEntity): Promise<void> {
		try {
			await this._repository.update(id, obj);
			return;
		} catch (error) {
			Logger.error(`[Service] ${error.message}`, error);
			throw error;
		}
	}

	async delete(id: any): Promise<void> {
		try {
			await this._repository.delete(id);
			return;
		} catch (error) {
			Logger.error(`[Service] ${error.message}`, error);
			throw error;
		}
	}
}

export default ServiceBase;
