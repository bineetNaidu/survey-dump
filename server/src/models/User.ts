import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, prop as Property } from '@typegoose/typegoose';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

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
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
