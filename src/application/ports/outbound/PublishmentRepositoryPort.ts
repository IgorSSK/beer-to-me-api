import Publishment from '@application/domain/entities/Publishment';
import IRepositoryBase from '@application/domain/interfaces/IRepositoryBase';

interface PublishmentRepositoryPort extends IRepositoryBase<Publishment> {}

export default PublishmentRepositoryPort;
