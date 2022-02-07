interface IDatabase<TEntity> {
	select(id?: any, query?: any): Promise<TEntity[] | undefined>;
	selectById(id: any): Promise<TEntity | undefined>;
	insert(obj: TEntity): Promise<void>;
	update(id: any, obj: TEntity): Promise<void>;
	delete(id: any): Promise<void>;
}

export default IDatabase;
