import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, prop as Property, Ref } from '@typegoose/typegoose';
import { Question } from './Question';

export enum SurveyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DRAFT = 'DRAFT',
}

@ObjectType()
export class Survey {
  @Field(() => String)
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true, unique: true })
  slug!: string;

  @Field()
  @Property({ required: true })
  title!: string;

  @Field()
  @Property({ required: true })
  description!: string;

  @Field(() => String)
  @Property({ enum: SurveyStatus, default: SurveyStatus.DRAFT })
  status: SurveyStatus;

  @Field()
  @Property({ required: true })
  creator!: string;

  @Field(() => [Question])
  @Property({ ref: () => Question, default: [] })
  questions: Ref<Question>[];
}

export const SurveyModel = getModelForClass(Survey, {
  schemaOptions: {
    timestamps: true,
  },
});
