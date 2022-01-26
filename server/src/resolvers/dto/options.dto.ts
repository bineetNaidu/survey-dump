import { Field, InputType } from 'type-graphql';

@InputType()
export class OptionInput {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  other?: string;
}
