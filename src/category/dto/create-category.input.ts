import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @Field(() => String, { description: 'Code' })
  code: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { description: 'Description', nullable: true })
  description: string;
}
