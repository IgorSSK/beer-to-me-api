interface IServiceBase<TEntity> {
	create(obj: TEntity): Promise<void>;
	findAll(): Promise<TEntity[] | undefined>;
	findById(id: string | number): Promise<TEntity | undefined>;
	update(id: string, obj: TEntity): Promise<void>;
	delete(id: string | number): Promise<void>;
}

export default IServiceBase;
