import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
@ObjectType()
export class Category {
  @Transform(({ value }) => value.toString())
  @Field(() => String, { name: 'id', nullable: true })
  _id: string;

  @Prop({
    type: String,
    unique: true,
  })
  @Field(() => String, {
    name: 'code',
    description: 'Unique code for category',
  })
  code: string;

  @Prop({
    type: String,
    unique: false,
    required: false,
  })
  @Field(() => String, { name: 'description', nullable: true })
  description?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
