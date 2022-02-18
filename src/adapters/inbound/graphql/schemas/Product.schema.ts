import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
class ProductSchema {
	@Field()
	brand: string;

	@Field({ nullable: true })
	imageUrl: string;
}

@InputType()
class ProductInput {
	@Field()
	brand: string;

	@Field({ nullable: true })
	imageUrl: string;
}

export { ProductSchema, ProductInput };
