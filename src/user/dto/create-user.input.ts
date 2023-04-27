import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

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
  @MinLength(6)
  @MaxLength(30)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  @Field(() => String)
  password: string;
}
