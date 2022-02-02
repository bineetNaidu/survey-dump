import { ForbiddenError } from 'apollo-server-core';
import { CtxType } from '../types';
import { MiddlewareFn } from 'type-graphql';
import { getAuthUser } from '../utils';
import { OptionModel } from '../models/Option';
import { GraphQLError } from 'graphql';
import { QuestionModel } from '../models/Question';

type ResourceType = 'survey' | 'option' | 'question';

export const isOwner: (resourceType: ResourceType) => MiddlewareFn<CtxType> =
  (resType) =>
  async ({ context, args }, next) => {
    const authUser = await getAuthUser(context.req);

    let hasPermission = false;

    if (resType === 'option') {
      const option = await OptionModel.findById(args.id);
      if (!option) throw new GraphQLError('Option not found');
      hasPermission = option.user!._id.toString() === authUser!._id.toString();
    }

    if (resType === 'question') {
      const question = await QuestionModel.findById(args.id);
      if (!question) throw new GraphQLError('Question not found');
      hasPermission =
        question.user!._id.toString() === authUser!._id.toString();
    }

    if (resType === 'survey') {
      hasPermission = authUser!.surveys.some(
        (survey) => survey!._id.toString() === args.id.toString()
      );
    }

    if (!hasPermission) {
      throw new ForbiddenError('You are not authorized to perform this action');
    }

    return next();
  };
