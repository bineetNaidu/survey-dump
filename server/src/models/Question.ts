import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import {
  getModelForClass,
  prop as Property,
  Ref,
  post,
  pre,
} from '@typegoose/typegoose';
import { Survey, SurveyModel, SurveyStatus } from './Survey';
import { Option, OptionModel } from './Option';
import { ResponseModel } from './Response';
import { User } from './User';

@post<Question>('remove', async (question) => {
  if (question) {
    await OptionModel.deleteMany({
      _id: {
        $in: question.options,
      },
    });
    await ResponseModel.deleteMany({}).where('question').equals(question._id);
    const survey = await SurveyModel.findById(question.survey!._id);
    console.log(survey);
    survey!.questions = survey!.questions.filter(
      (q) => q!._id.toString() !== question._id.toString()
    );
    await survey!.save();
  }
})
@pre<Question>('remove', async function (next) {
  try {
    const survey = await SurveyModel.findById(this.survey?._id);
    if (survey && survey.status === SurveyStatus.ACTIVE) {
      throw new Error('Cannot delete question while survey is active');
    }
    next();
  } catch (error) {
    next(error);
  }
})
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
  @Property({ ref: 'Option', default: [] })
  options: Ref<Option>[];

  @Field(() => User)
  @Property({ ref: 'User', required: true })
  user!: Ref<User>;
}

export const QuestionModel = getModelForClass(Question, {
  schemaOptions: {
    timestamps: true,
  },
});
