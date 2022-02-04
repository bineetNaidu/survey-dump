import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  UseMiddleware,
} from 'type-graphql';
import { User, UserModel } from '../models/User';
import {
  AuthResponse,
  LoginInput,
  RegisterInput,
  UpdateUserInput,
} from './dto/users.dto';
import { CtxType } from '../types';
import { getAuthUser } from '../utils';
import { isAuthenticated } from '../middlewares/isAuthenticated';

@Resolver()
export class UserResolver {
  @Mutation(() => AuthResponse)
  async register(@Arg('data') data: RegisterInput): Promise<AuthResponse> {
    const { name, email, password, avatar } = data;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return {
        errors: [
          {
            field: 'email',
            message:
              'The email is already registered, try another one or login',
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(password);
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      avatar:
        avatar ||
        `https://avatars.dicebear.com/api/human/${data.name.replace(
          ' ',
          ''
        )}.svg`,
    });
    await user.save();

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: '2d',
      }
    );

    return {
      token,
      user,
    };
  }

  @Mutation(() => AuthResponse)
  async login(@Arg('data') data: LoginInput): Promise<AuthResponse> {
    const { email, password } = data;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        errors: [
          {
            field: 'email',
            message: 'user not found',
          },
        ],
      };
    }
    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'invalid password',
          },
        ],
      };
    }
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: '2d',
      }
    );

    return {
      token,
      user,
    };
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async me(@Ctx() { req }: CtxType): Promise<User | null> {
    return getAuthUser(req);
  }

  @Mutation(() => User)
  @UseMiddleware(isAuthenticated)
  async updateMe(
    @Arg('data') data: UpdateUserInput,
    @Ctx() { req }: CtxType
  ): Promise<User> {
    const authUser = await getAuthUser(req);
    const user = await UserModel.findById(authUser!._id);
    if (!user) {
      throw new Error('User not found');
    }
    if (data.name) {
      user.name = data.name;
    }
    if (data.avatar) {
      user.avatar = data.avatar;
    }
    await user.save();
    return user;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteMe(@Ctx() { req }: CtxType): Promise<boolean> {
    const authUser = await getAuthUser(req);
    const user = await UserModel.findById(authUser!._id);
    if (!user) {
      return false;
    }
    await user.remove();
    return true;
  }
}
