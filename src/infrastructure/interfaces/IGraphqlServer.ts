interface IGraphqlServer<THandler = any, TServer = any> {
	handler: () => THandler;
	server: () => TServer;
}

export default IGraphqlServer;
