import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';
import GraphqlTypeJson from 'graphql-type-json';

export type PostDocument = Post & Document;

@Schema()
@ObjectType()
export class Post {
  @Transform(({ value }) => value.toString())
  @Field(() => String, { name: 'id', nullable: true })
  _id: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  @Field(() => String, {
    name: 'title',
    nullable: false,
  })
  title: string;

  @Prop({
    type: String,
    isRequired: false,
  })
  @Field(() => String, { nullable: true })
  url_banner?: string;

  @Prop({
    type: Object,
    required: true,
  })
  @Field(() => GraphqlTypeJson, { nullable: false })
  content: object;

  @Prop({
    type: String,
    default: true,
    required: false,
  })
  @Field(() => Boolean, { defaultValue: true, nullable: true })
  public?: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
