import Publishment from '@application/domain/entities/Publishment';
import IRepositoryBase from '@application/domain/interfaces/IRepositoryBase';

interface PublishmentRepositoryPort extends IRepositoryBase<Publishment> {
	uploadPublishmentImage(
		key: string,
		body: Blob | Uint8Array,
		contentType?: string
	): Promise<string>;
}

export default PublishmentRepositoryPort;
