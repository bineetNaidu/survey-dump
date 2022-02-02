import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import {
  getModelForClass,
  prop as Property,
  Ref,
  post,
} from '@typegoose/typegoose';
import { Survey, SurveyModel } from './Survey';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@post<User>('remove', async (user) => {
  if (user) {
    await SurveyModel.deleteMany({
      _id: {
        $in: user.surveys,
      },
    });
  }
})
@ObjectType()
export class User {
  @Field(() => String)
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  name!: string;

  @Field()
  @Property({ required: true, unique: true })
  email!: string;

  @Property({ required: true })
  password!: string;

  @Field(() => String)
  @Property({ required: false, default: UserRole.USER, enum: UserRole })
  role!: UserRole;

  @Field()
  @Property({ required: true })
  avatar!: string;

  @Field()
  @Property({ required: true, default: false })
  isVerified!: boolean;

  @Property({ default: [], ref: 'Survey' })
  surveys: Ref<Survey>[];
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
