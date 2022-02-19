import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
class EstabelishmentSchema {
	@Field()
	name: string;

	@Field()
	address: string;

	@Field({ nullable: true })
	imageUrl: string;
}

@InputType()
class EstabelishmentInput {
	@Field()
	name: string;

	@Field()
	address: string;

	@Field()
	imageUrl: string;
}

export { EstabelishmentSchema, EstabelishmentInput };
