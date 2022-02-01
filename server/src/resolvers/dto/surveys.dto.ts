import { Field, InputType } from 'type-graphql';

@InputType()
export class SurveyInput {
  @Field()
  title!: string;
  @Field()
  description!: string;
}
