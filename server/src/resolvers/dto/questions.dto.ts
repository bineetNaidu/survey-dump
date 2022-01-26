import { Field, InputType } from 'type-graphql';

@InputType()
export class QuestionOptionInput {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  other?: string;
}

@InputType()
export class QuestionInput {
  @Field()
  title!: string;
  @Field()
  isOption!: boolean;
  @Field()
  isField!: boolean;
  @Field(() => String, { nullable: true })
  fieldPlaceholder?: string;
  @Field()
  survey!: string;
  @Field(() => [QuestionOptionInput])
  options: QuestionOptionInput[];
}

@InputType()
export class UpdateQuestionInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  fieldPlaceholder?: string;
}
