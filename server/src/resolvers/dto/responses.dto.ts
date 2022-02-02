import { Field, InputType } from 'type-graphql';

@InputType()
export class ResponseInput {
  @Field()
  questionId: string;
  @Field()
  surveyId: string;
  @Field({ nullable: true })
  text?: string;
  @Field({ nullable: true })
  selectedOptionId?: string;
}
