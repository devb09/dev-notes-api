import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import { Document } from 'mongoose';
import GraphqlTypeJson from 'graphql-type-json';
import mongoose from 'mongoose';
import { User } from '../../user/entities/user.entity';

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
  content: JSON;

  @Prop({
    type: String,
    default: true,
    required: false,
  })
  @Field(() => Boolean, { defaultValue: true, nullable: true })
  public?: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  @Type(() => User)
  author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
