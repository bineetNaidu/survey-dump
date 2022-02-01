import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-core';
import { CtxType } from 'src/types';
import { MiddlewareFn } from 'type-graphql';

export const isAuthenticated: MiddlewareFn<CtxType> = ({ context }, next) => {
  const authorization = (context.req.headers as any)['authorization'];
  if (!authorization) {
    throw new AuthenticationError('Not Authenticated, Please login');
  }
  const token = authorization?.split(' ')[1];
  if (!token) {
    throw new AuthenticationError('Not Authenticated, Please login');
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    throw new AuthenticationError('Not Authenticated, Please login');
  }

  return next();
};
