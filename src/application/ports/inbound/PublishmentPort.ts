import Comment from '@application/domain/entities/Comment';
import Publishment from '@application/domain/entities/Publishment';
import IServiceBase from '@application/domain/interfaces/IServiceBase';

interface PublishmentPort extends IServiceBase<Publishment> {
	insertComment(publishmentId: string, comment: Comment): void;
	voteConfiability(publishmentId: string, confiability: number): void;
}

export default PublishmentPort;
