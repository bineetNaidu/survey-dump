import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Question, QuestionModel } from '../models/Question';
import { OptionModel } from '../models/Option';
import { Survey, SurveyModel, SurveyStatus } from '../models/Survey';
import { QuestionInput, UpdateQuestionInput } from './dto/questions.dto';

@Resolver()
export class QuestionResolver {
  @Query(() => [Question])
  async getQuestionsBySurvey(
    @Arg('survey') survey: string
  ): Promise<Question[]> {
    return await QuestionModel.find({ survey }).populate({
      path: 'options',
    });
  }

  @Mutation(() => Question)
  async createQuestion(@Arg('data') data: QuestionInput): Promise<Question> {
    if (!data.isOption && !data.isField)
      throw new Error('Question must be either an option or a field');
    if (data.isOption && data.options.length === 0)
      throw new Error('Options are required for an option question');
    if (data.isField && !data.fieldPlaceholder)
      throw new Error('Placeholder is required for a field question');
    if (data.isField && data.isOption)
      throw new Error('A question cannot be both an option and a field');

    const question = new QuestionModel();
    const survey = await SurveyModel.findById(data.survey);

    if (!survey) throw new Error('Survey not found');
    if (survey.status === SurveyStatus.ACTIVE)
      throw new Error('Cannot add question while survey is active');

    question.title = data.title;
    question.isOption = data.isOption;
    question.isField = data.isField;
    question.fieldPlaceholder = data.fieldPlaceholder;
    question.survey = survey._id as any;

    const newQuestion = await question.save();

    survey.questions.push(newQuestion);
    await survey.save();

    if (data.isOption && data.options.length > 0) {
      for (const option of data.options) {
        const newOption = new OptionModel({
          ...option,
          question: newQuestion._id,
        });
        const op = await newOption.save();
        newQuestion.options.push(op);
        await newQuestion.save();
      }
    }

    return newQuestion;
  }

  @Mutation(() => Question, { nullable: true })
  async updateQuestion(
    @Arg('id') id: string,
    @Arg('data') data: UpdateQuestionInput
  ): Promise<Question | null> {
    const q = await QuestionModel.findById(id).populate({
      path: 'survey',
    });
    if (!q) return null;
    if ((q.survey as Survey).status === SurveyStatus.ACTIVE) {
      throw new Error('Cannot update question while survey is active');
    }
    if (data.title) q.title = data.title;
    if (q.isField && data.fieldPlaceholder)
      q.fieldPlaceholder = data.fieldPlaceholder;
    await q.save();
    return q;
  }

  @Mutation(() => Boolean)
  async deleteQuestion(@Arg('id') id: string): Promise<boolean> {
    const question = await QuestionModel.findById(id);
    if (!question) return false;
    await question.remove();
    return true;
  }
}
