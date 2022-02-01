import jwt from 'jsonwebtoken';
import { User, UserModel } from './models/User';
import { AuthUserType } from './types';

type GetAuthUserSignature = (req: Request) => Promise<User | null>;

export const getAuthUser: GetAuthUserSignature = async (req: Request) => {
  const token = (req.headers as any)['authorization'].split(' ')[1] as string;
  const payload = jwt.verify(token!, process.env.JWT_SECRET!) as AuthUserType;
  const user = await UserModel.findOne({ _id: payload._id });
  return user;
};
