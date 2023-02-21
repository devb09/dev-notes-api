import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@ObjectType()
export class User {
  @Transform(({ value }) => value.toString())
  @Field(() => String, { name: 'id', nullable: true })
  _id: string;

  @Transform((value) => value.toString().toLowerCase())
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  @Field(() => String, {
    nullable: false,
  })
  username: string;

  @Prop({ type: String })
  @Field(() => String)
  first_name: string;

  @Prop({ type: String })
  @Field(() => String)
  last_name: string;

  @Expose()
  get fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  @Prop({ type: String })
  @Field(() => String)
  email: string;

  @Prop({ type: String })
  @Exclude()
  @Field(() => String)
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
