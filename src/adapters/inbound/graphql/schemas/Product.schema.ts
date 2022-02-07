import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
class ProductSchema {
	@Field()
	brand: string;
}

@InputType()
class ProductInput {
	@Field()
	brand: string;
}

export { ProductSchema, ProductInput };
