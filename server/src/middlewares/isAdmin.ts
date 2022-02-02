import { ForbiddenError } from 'apollo-server-core';
import { CtxType } from '../types';
import { MiddlewareFn } from 'type-graphql';
import { getAuthUser } from '../utils';
import { UserRole } from '../models/User';

export const isAdmin: MiddlewareFn<CtxType> = async ({ context }, next) => {
  const authUser = await getAuthUser(context.req);

  if (authUser!.role !== UserRole.ADMIN) {
    throw new ForbiddenError('You are not authorized to perform this action');
  }

  return next();
};
