import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { ProductInput, ProductSchema } from './Product.schema';
import { EstabelishmentInput, EstabelishmentSchema } from './Estabelishment.schema';
import { CommentSchema } from './Comment.schema';
import { ConfiabilitySchema } from './Confiability.schema';

@ObjectType()
class PublishmentSchema {
	@Field()
	id: string;

	@Field(() => Int)
	price: number;

	@Field({ nullable: true })
	condition: string;

	@Field()
	createdAt: Date;

	@Field({ nullable: true })
	updatedAt: Date;

	@Field(() => ConfiabilitySchema)
	confiability: ConfiabilitySchema;

	@Field(() => EstabelishmentSchema)
	estabelishment: EstabelishmentSchema;

	@Field(() => ProductSchema)
	product: ProductSchema;

	@Field(() => [CommentSchema], { nullable: true })
	comments: CommentSchema[];
}

@InputType()
class CreatePublishmentInput {
	@Field(() => Int)
	price: number;

	@Field()
	condition: string;

	@Field(() => EstabelishmentInput)
	estabelishment: EstabelishmentInput;

	@Field(() => ProductInput)
	product: ProductInput;
}

export { PublishmentSchema, CreatePublishmentInput };
