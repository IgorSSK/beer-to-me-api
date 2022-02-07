import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import PublishmentRepositoryAdapter from '@adapters/outbound/repository/PublishmentRepositoryAdapter';
import PublishmentPort from '@application/ports/inbound/PublishmentPort';
import PublishmentService from '@application/services/PublishmentService';
import Publishment from '@application/domain/entities/Publishment';
import Comment from '@application/domain/entities/Comment';
import { InsertCommentInput } from '../schemas/Comment.schema';
import { PublishmentSchema, CreatePublishmentInput } from '../schemas/Publishment.schema';
import { VoteConfiabilityArgs } from '../schemas/Confiability.schema';
import Logger from '@common/helpers/Logger';

@Resolver()
class PublishmentResolver {
	constructor(private _publishmentService: PublishmentPort) {
		const publishmentRepository = new PublishmentRepositoryAdapter();
		this._publishmentService = new PublishmentService(publishmentRepository);
	}

	@Query(() => [PublishmentSchema])
	async findAllPublishments() {
		const pin = Logger.start();
		Logger.info('[Resolver] Query: findAllPublishments');

		const response = await this._publishmentService.findAll();

		Logger.end(pin);
		return response;
	}

	@Query(() => PublishmentSchema, { nullable: true })
	async findPublishmentById(@Arg('id') id: string) {
		const pin = Logger.start();
		Logger.info('[Resolver] Query: findPublishmentById');
		Logger.info('[Resolver] Input Params: ', { id });

		const response = await this._publishmentService.findById(id);

		Logger.end(pin);
		return response;
	}

	@Mutation(() => PublishmentSchema, { nullable: true })
	async createPublishment(
		@Arg('publishment') publishmentInput: CreatePublishmentInput
	): Promise<void> {
		const pin = Logger.start();
		Logger.info('[Resolver] Mutation: createPublishment');
		Logger.info('[Resolver] Input Params: ', publishmentInput);

		const publishment = new Publishment();
		publishment.price = publishmentInput.price;
		publishment.condition = publishmentInput.condition;
		publishment.estabelishment = publishmentInput.estabelishment;
		publishment.product = publishmentInput.product;

		await this._publishmentService.create(publishment);

		Logger.end(pin);
		return;
	}

	@Mutation(() => String, { nullable: true })
	voteConfiability(@Args() { publishmentId, confiability }: VoteConfiabilityArgs): void {
		const pin = Logger.start();
		Logger.info('[Resolver] Mutation: voteConfiability');
		Logger.info('[Resolver] Input Params: ', { publishmentId, confiability });

		this._publishmentService.voteConfiability(publishmentId, confiability);

		Logger.end(pin);
		return;
	}

	@Mutation(() => String, { nullable: true })
	insertComment(@Arg('comment') commentInput: InsertCommentInput): void {
		const pin = Logger.start();
		Logger.info('[Resolver] Mutation: insertComment');
		Logger.info('[Resolver] Input Params: ', commentInput);

		const comment = new Comment();
		comment.author = commentInput.author;
		comment.text = commentInput.text;

		this._publishmentService.insertComment(commentInput.publishmentId, comment);

		Logger.end(pin);
		return;
	}
}

export default PublishmentResolver;
