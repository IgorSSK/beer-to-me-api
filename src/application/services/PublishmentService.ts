import Comment from '@application/domain/entities/Comment';
import PublishmentRepositoryPort from '@application/ports/outbound/PublishmentRepositoryPort';
import Logger from '@common/helpers/Logger';
import Publishment from '../domain/entities/Publishment';
import PublishmentPort from '../ports/inbound/PublishmentPort';
import ServiceBase from './ServiceBase';

class PublishmentService extends ServiceBase<Publishment> implements PublishmentPort {
	constructor(private _publishmentRepository: PublishmentRepositoryPort) {
		super(_publishmentRepository);
	}

	async insertComment(publishmentId: string, comment: Comment): Promise<void> {
		try {
			const publishment = await this._publishmentRepository.findById(publishmentId);

			if (!publishment) throw new Error('No publishment found');

			comment.dateTime = new Date();

			if (!publishment.comments) publishment.comments = [];
			publishment.comments.push(comment);

			await this._publishmentRepository.update(publishmentId, publishment);
			return;
		} catch (error) {
			Logger.error(`[Service] ${error.message}`, error);
			throw error;
		}
	}

	async voteConfiability(publishmentId: string, confiability: number): Promise<void> {
		try {
			const response = await this._publishmentRepository.findById(publishmentId);

			if (!response) throw new Error('No publishment found');

			const publishment = new Publishment(response);
			publishment.voteConfiability(confiability);

			Logger.info('[Service] New calculated confiability: ', publishment.confiability);

			await this._publishmentRepository.update(publishmentId, publishment);
			return;
		} catch (error) {
			Logger.error(`[Service] ${error.message}`, error);
			throw error;
		}
	}
}

export default PublishmentService;
