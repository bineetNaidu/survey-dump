import { Survey, SurveyModel, SurveyStatus } from '../models/Survey';
import {
  Arg,
  Query,
  Resolver,
  Mutation,
  Ctx,
  UseMiddleware,
} from 'type-graphql';
import { nanoid } from 'nanoid';
import { SurveyInput } from './dto/surveys.dto';
import { getAuthUser } from '../utils';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { CtxType } from '../types';
import { UserModel } from '../models/User';
import { isOwner } from '../middlewares/isOwner';

@Resolver()
export class SurveyResolver {
  @Query(() => Survey, { nullable: true })
  async getSurveyBySlug(@Arg('slug') slug: string) {
    return await SurveyModel.findOne({ slug })
      .populate({
        path: 'questions',
        populate: {
          path: 'options',
        },
      })
      .populate({
        path: 'creator',
        select: ['_id', 'email'],
      });
  }

  @Query(() => [Survey])
  @UseMiddleware(isAuthenticated)
  async getSurveys(@Ctx() { req }: CtxType) {
    const authUser = await getAuthUser(req);
    return await SurveyModel.find({
      creator: authUser!._id,
    })
      .populate({
        path: 'questions',
        populate: {
          path: 'options',
        },
      })
      .populate({
        path: 'creator',
        select: ['_id', 'email'],
      });
  }

  @Mutation(() => Survey)
  @UseMiddleware(isAuthenticated)
  async createSurvey(@Arg('data') data: SurveyInput, @Ctx() { req }: CtxType) {
    const authUser = await getAuthUser(req);
    const surveyObj: Omit<Survey, '_id' | 'questions' | 'status'> = {
      creator: authUser!,
      description: data.description,
      slug: nanoid(),
      title: data.title,
    };
    const newSurvey = new SurveyModel(surveyObj);
    const survey = await newSurvey.save();
    await UserModel.findByIdAndUpdate(authUser!._id, {
      $push: {
        surveys: survey._id,
      },
    });
    return survey;
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseMiddleware(isAuthenticated, isOwner('survey'))
  @UseMiddleware()
  async deleteSurvey(@Arg('id') id: string) {
    const survey = await SurveyModel.findById(id);
    if (!survey) {
      return false;
    }
    await survey.remove();
    return true;
  }

  @Mutation(() => Survey, { nullable: true })
  @UseMiddleware(isAuthenticated, isOwner('survey'))
  async updateSurveyStatus(
    @Arg('id') id: string,
    @Arg('status') status: SurveyStatus
  ) {
    const survey = await SurveyModel.findById(id);
    if (!survey) {
      return null;
    }
    if (survey.questions.length === 0) {
      throw new Error(
        'Survey must have at least one question before you publish it.'
      );
    }
    survey.status = status;
    await survey.save();
    return survey;
  }
}
