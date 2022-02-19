import Comment from '@application/domain/entities/Comment';
import PublishmentRepositoryPort from '@application/ports/outbound/PublishmentRepositoryPort';
import { convertBase64toUploadObject } from '@common/helpers/Converter';
import Logger from '@common/helpers/Logger';
import Publishment from '../domain/entities/Publishment';
import PublishmentPort from '../ports/inbound/PublishmentPort';
import ServiceBase from './ServiceBase';

class PublishmentService extends ServiceBase<Publishment> implements PublishmentPort {
	constructor(private _publishmentRepository: PublishmentRepositoryPort) {
		super(_publishmentRepository);
	}

	override async create(publishment: Publishment): Promise<void> {
		try {
			if (publishment?.estabelishment?.imageUrl) {
				const name = `estabelishments/${
					publishment?.estabelishment.name
				}-${new Date().getTime()}`;
				const estabelishmentImage = convertBase64toUploadObject(
					publishment?.estabelishment?.imageUrl,
					name
				);

				if (estabelishmentImage)
					publishment.estabelishment.imageUrl =
						await this._publishmentRepository.uploadPublishmentImage(
							estabelishmentImage.name,
							estabelishmentImage.object,
							estabelishmentImage?.type
						);
			}

			if (publishment?.product?.imageUrl) {
				const name = `products/${publishment?.product.brand}-${new Date().getTime()}`;
				const productImage = convertBase64toUploadObject(
					publishment?.product?.imageUrl,
					name
				);

				if (productImage)
					publishment.product.imageUrl =
						await this._publishmentRepository.uploadPublishmentImage(
							productImage.name,
							productImage.object,
							productImage?.type
						);
			}

			this._publishmentRepository.create(publishment);
			return;
		} catch (error) {
			Logger.error(`[Service] ${error.message}`, error);
			throw error;
		}
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
