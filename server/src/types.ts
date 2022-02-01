import { JwtPayload } from 'jsonwebtoken';
import { UserRole } from './models/User';

export type AuthUserType = JwtPayload & {
  _id: string;
  email: string;
  role: UserRole;
};

export interface CtxType {
  req: Request;
  res: Response;
}
