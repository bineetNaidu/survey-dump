import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, prop as Property, Ref } from '@typegoose/typegoose';
import { Survey } from './Survey';
import { Option } from './Option';

@ObjectType()
export class Question {
  @Field(() => String)
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  title!: string;

  @Field()
  @Property({ required: true })
  isOption!: boolean;

  @Field()
  @Property({ required: true })
  isField!: boolean;

  @Field(() => String, { nullable: true })
  @Property()
  fieldPlaceholder?: string;

  @Field(() => Survey)
  @Property({ ref: 'Survey' })
  survey: Ref<Survey>;

  @Field(() => [Option])
  @Property({ ref: () => Option, default: [] })
  options: Ref<Option>[];
}

export const QuestionModel = getModelForClass(Question, {
  schemaOptions: {
    timestamps: true,
  },
});
