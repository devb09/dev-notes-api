import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Category {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // id: number;

  @Prop({
    type: String,
    unique: true,
    index: true,
  })
  @Field(() => String, {
    name: 'code',
    description: 'Unique code for category',
  })
  code: string;

  @Prop({
    type: String,
    unique: false,
  })
  @Field(() => String, { name: 'description' })
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
