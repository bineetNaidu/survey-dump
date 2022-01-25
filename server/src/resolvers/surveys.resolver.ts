import { Survey, SurveyModel } from '../models/Survey';
import { Arg, Query, Resolver, Mutation, InputType, Field } from 'type-graphql';
import { nanoid } from 'nanoid';

// create a new survey input type
@InputType()
class SurveyInput {
  @Field()
  title!: string;
  @Field()
  description!: string;
  @Field()
  creator!: string;
}

@Resolver()
export class SurveyResolver {
  @Query(() => Survey, { nullable: true })
  async getSurveyBySlug(@Arg('slug') slug: string) {
    return await SurveyModel.findOne({ slug });
  }

  @Query(() => [Survey])
  async getSurveys(@Arg('creator') creator: string) {
    return await SurveyModel.find({ creator });
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
}
