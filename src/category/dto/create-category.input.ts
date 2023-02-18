import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { description: 'Code' })
  code: string;

  @Field(() => String, { description: 'Description', nullable: true })
  description: string;
}
