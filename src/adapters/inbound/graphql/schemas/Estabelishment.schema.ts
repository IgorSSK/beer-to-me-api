import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
class EstabelishmentSchema {
	@Field()
	name: string;

	@Field()
	address: string;

	@Field({ nullable: true })
	image: string;
}

@InputType()
class EstabelishmentInput {
	@Field()
	name: string;

	@Field()
	address: string;

	@Field()
	image: string;
}

export { EstabelishmentSchema, EstabelishmentInput };
