import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
class CommentSchema {
	@Field()
	author: string;

	@Field()
	text: string;

	@Field()
	dateTime: Date;
}

@InputType()
class InsertCommentInput {
	@Field()
	publishmentId: string;

	@Field()
	author: string;

	@Field()
	text: string;
}

export { CommentSchema, InsertCommentInput };
