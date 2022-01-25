import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, prop as Property } from '@typegoose/typegoose';

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
}

export const OptionModel = getModelForClass(Option, {
  schemaOptions: {
    timestamps: true,
  },
});
