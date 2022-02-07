import { Min, Max } from 'class-validator';
import { ArgsType, Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
class ConfiabilitySchema {
	@Field(() => Int)
	avarage: number;

	@Field(() => Int)
	count: number;
}

@ArgsType()
class VoteConfiabilityArgs {
	@Field()
	publishmentId: string;

	@Field(() => Int)
	@Min(0)
	@Max(100)
	confiability: number;
}

export { ConfiabilitySchema, VoteConfiabilityArgs };
