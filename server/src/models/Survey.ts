import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import {
  getModelForClass,
  prop as Property,
  Ref,
  post,
} from '@typegoose/typegoose';
import { Question, QuestionModel } from './Question';
import { OptionModel } from './Option';
import { ResponseModel } from './Response';
import { User } from './User';

export enum SurveyStatus {
  ACTIVE = 'ACTIVE',
  DRAFT = 'DRAFT',
}

@post<Survey>('remove', async (survey) => {
  if (survey) {
    const questions = await QuestionModel.find({
      _id: {
        $in: survey.questions,
      },
    });
    for (const question of questions) {
      await OptionModel.deleteMany({
        _id: {
          $in: question.options,
        },
      });
    }
    await QuestionModel.deleteMany({
      _id: {
        $in: survey.questions,
      },
    });

    await ResponseModel.deleteMany({}).where('survey').equals(survey._id);
  }
})
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

  @Field(() => User)
  @Property({ required: true, ref: User })
  creator!: Ref<User>;

  @Field(() => [Question])
  @Property({ ref: () => Question, default: [] })
  questions: Ref<Question>[];
}

export const SurveyModel = getModelForClass(Survey, {
  schemaOptions: {
    timestamps: true,
  },
});
