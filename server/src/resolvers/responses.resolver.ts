import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from 'type-graphql';
import { Response, ResponseModel } from '../models/Response';
import { SurveyModel, SurveyStatus } from '../models/Survey';
import { ResponseInput } from './dto/responses.dto';
import { getAuthUser } from '../utils';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { CtxType } from '../types';

@Resolver()
export class ResponseResolver {
  @Query(() => [Response])
  @UseMiddleware(isAuthenticated)
  findResponseBySurveySlug(@Arg('slug') slug: string) {
    return ResponseModel.find({ slug }).populate([
      'question',
      'selectedOption',
      'survey',
      'user',
    ]);
  }

  @Mutation(() => Response)
  @UseMiddleware(isAuthenticated)
  async createResponse(
    @Arg('data') data: ResponseInput,
    @Ctx() { req }: CtxType
  ) {
    const existingResponse = await ResponseModel.findOne({
      survey: data.surveyId,
      question: data.questionId,
    });
    if (existingResponse) {
      throw new Error(
        'Response already exists, cannot create when it already exists'
      );
    }
    const survey = await SurveyModel.findById(data.surveyId);
    if (!survey) {
      throw new Error('Survey not found');
    }
    if (survey.status !== SurveyStatus.ACTIVE) {
      throw new Error(
        'Survey is not active anymore, cannot Response at this time'
      );
    }
    const authUser = await getAuthUser(req);

    const response = await ResponseModel.create({
      survey: data.surveyId,
      question: data.questionId,
      user: authUser!,
      text: data.text,
      selectedOption: data.selectedOptionId,
    });
    await response.save();
    await response.populate(['question', 'selectedOption', 'survey']);
    return response;
  }
}
