import { Survey, SurveyModel, SurveyStatus } from '../models/Survey';
import { Arg, Query, Resolver, Mutation } from 'type-graphql';
import { nanoid } from 'nanoid';
import { SurveyInput } from './dto/surveys.dto';

@Resolver()
export class SurveyResolver {
  @Query(() => Survey, { nullable: true })
  async getSurveyBySlug(@Arg('slug') slug: string) {
    return await SurveyModel.findOne({ slug }).populate({
      path: 'questions',
      populate: {
        path: 'options',
      },
    });
  }

  @Query(() => [Survey])
  async getSurveys(@Arg('creator') creator: string) {
    return await SurveyModel.find({ creator }).populate({
      path: 'questions',
      populate: {
        path: 'options',
      },
    });
  }

  @Mutation(() => Survey)
  async createSurvey(@Arg('data') data: SurveyInput) {
    const surveyObj: Omit<Survey, '_id' | 'questions' | 'status'> = {
      creator: data.creator,
      description: data.description,
      slug: nanoid(),
      title: data.title,
    };
    const newSurvey = new SurveyModel(surveyObj);
    const survey = await newSurvey.save();
    return survey;
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteSurvey(@Arg('id') id: string) {
    const survey = await SurveyModel.findById(id);
    if (!survey) {
      return false;
    }
    await survey.remove();
    return true;
  }

  @Mutation(() => Survey, { nullable: true })
  async updateSurveyStatus(
    @Arg('id') id: string,
    @Arg('status') status: SurveyStatus
  ) {
    const survey = await SurveyModel.findById(id);
    if (!survey) {
      return null;
    }
    survey.status = status;
    await survey.save();
    return survey;
  }
}
