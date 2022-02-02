import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, prop as Property, Ref } from '@typegoose/typegoose';
import { User } from './User';

@ObjectType()
export class Option {
  @Field(() => String)
  readonly _id: ObjectId;

  @Field(() => String, { nullable: true })
  @Property({ default: '' })
  name?: string;

  @Field(() => String, { nullable: true })
  @Property({ default: '' })
  other?: string;

  @Field(() => User)
  @Property({ ref: () => User, required: true })
  user!: Ref<User>;
}

export const OptionModel = getModelForClass(Option, {
  schemaOptions: {
    timestamps: true,
  },
});
