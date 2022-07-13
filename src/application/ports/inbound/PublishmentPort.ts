import Comment from '@application/domain/entities/Comment';
import Confiability from '@application/domain/entities/Confiability';
import Publishment from '@application/domain/entities/Publishment';
import IServiceBase from '@application/domain/interfaces/IServiceBase';

interface PublishmentPort extends IServiceBase<Publishment> {
	insertComment(publishmentId: string, comment: Comment): void;
	voteConfiability(publishmentId: string, confiability: number): Promise<Confiability>;
}

export default PublishmentPort;
