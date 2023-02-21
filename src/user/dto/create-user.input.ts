import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @MinLength(3)
  @Field(() => String, {
    nullable: false,
  })
  username: string;

  @IsNotEmpty()
  @MinLength(2)
  @Field(() => String)
  first_name: string;

  @IsNotEmpty()
  @MinLength(1)
  @Field(() => String)
  last_name: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @Field(() => String)
  password: string;
}
