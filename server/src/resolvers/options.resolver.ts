import { Mutation, Resolver, Arg, UseMiddleware } from 'type-graphql';
import { OptionModel, Option } from '../models/Option';
import { QuestionModel } from '../models/Question';
import { OptionInput } from './dto/options.dto';
import { isAuthenticated } from '../middlewares/isAuthenticated';

@Resolver()
export class OptionResolver {
  @Mutation(() => Option)
  @UseMiddleware(isAuthenticated)
  async createOption(
    @Arg('questionId') questionId: string,
    @Arg('data') data: OptionInput
  ): Promise<Option> {
    const question = await QuestionModel.findById(questionId);
    if (!question) throw new Error('Question not found');
    const option = new OptionModel({
      name: data.name,
      other: data.other,
    });
    await option.save();
    question.options.push(option);
    await question.save();
    return option;
  }

  @Mutation(() => Option, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async updateOption(
    @Arg('id') id: string,
    @Arg('data') data: OptionInput
  ): Promise<Option | null> {
    const option = await OptionModel.findById(id);
    if (!option) return null;

    if (data.name) option.name = data.name;

    if (data.other) option.other = data.other;

    await option.save();
    return option;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteOption(
    @Arg('id') id: string,
    @Arg('questionId') questionId: string
  ): Promise<boolean> {
    const question = await QuestionModel.findById(questionId);
    if (!question) return false;
    const option = await OptionModel.findById(id);
    if (!option) return false;

    question.update({
      $pull: {
        options: option._id,
      },
    });

    await question.save();

    await option.remove();
    return true;
  }
}
