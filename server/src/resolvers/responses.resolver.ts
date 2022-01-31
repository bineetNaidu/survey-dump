import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Response, ResponseModel } from '../models/Response';
import { SurveyModel, SurveyStatus } from '../models/Survey';
import { ResponseInput } from './dto/responses.dto';

@Resolver()
export class ResponseResolver {
  @Query(() => [Response])
  findResponseBySurveySlug(@Arg('slug') slug: string) {
    return ResponseModel.find({ slug }).populate([
      'question',
      'selectedOption',
      'survey',
    ]);
  }

  @Mutation(() => Response)
  async createResponse(@Arg('data') data: ResponseInput) {
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

    const response = await ResponseModel.create({
      survey: data.surveyId,
      question: data.questionId,
      user: data.user,
      text: data.text,
      selectedOption: data.selectedOptionId,
    });
    await response.save();
    await response.populate(['question', 'selectedOption', 'survey']);
    return response;
  }
}
