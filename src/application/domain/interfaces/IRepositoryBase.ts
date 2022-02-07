interface IRepositoryBase<TEntity> {
	create(obj: TEntity): Promise<void>;
	findAll(): Promise<TEntity[]>;
	findById(id: any): Promise<TEntity | undefined>;
	update(id: any, obj: TEntity): Promise<void>;
	delete(id: any): Promise<void>;
}

export default IRepositoryBase;
