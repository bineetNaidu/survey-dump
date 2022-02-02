import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, prop as Property, Ref } from '@typegoose/typegoose';
import { Question } from './Question';
import { Option } from './Option';
import { Survey } from './Survey';
import { User } from './User';

@ObjectType()
export class Response {
  @Field(() => String)
  readonly _id: ObjectId;

  @Field(() => User)
  @Property({ required: true, ref: 'User' })
  user!: Ref<User>;

  @Field(() => Survey)
  @Property({ required: true, ref: 'Survey' })
  survey!: Ref<Survey>;

  @Field(() => Question)
  @Property({ required: true, ref: 'Question' })
  question!: Ref<Question>;

  @Field(() => Option, { nullable: true })
  @Property({ ref: 'Option' })
  selectedOption?: Ref<Option>;

  @Field(() => String, { nullable: true })
  @Property()
  text?: string;
}

export const ResponseModel = getModelForClass(Response, {
  schemaOptions: {
    timestamps: true,
  },
});
