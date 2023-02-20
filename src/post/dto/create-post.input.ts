import { InputType, Field } from '@nestjs/graphql';
import {
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsBoolean,
} from 'class-validator';
import GraphqlTypeJson from 'graphql-type-json';

@InputType()
export class CreatePostInput {
  @IsNotEmpty()
  @MinLength(3)
  @Field(() => String, { nullable: false })
  title: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  url_banner?: string;

  @IsObject()
  @IsNotEmpty()
  @Field(() => GraphqlTypeJson, { nullable: false })
  content: object;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { defaultValue: true, nullable: true })
  public?: boolean;
}
