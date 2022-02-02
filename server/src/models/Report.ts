import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { getModelForClass, prop as Property, Ref } from '@typegoose/typegoose';
import { User } from './User';

export enum ReportType {
  BUG = 'BUG',
}

export enum ReportStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

@ObjectType()
export class Report {
  @Field(() => String)
  readonly _id: ObjectId;

  @Field(() => User)
  @Property({ required: true, ref: 'User' })
  user!: Ref<User>;

  @Field()
  @Property({ required: true, enum: ReportType, default: ReportType.BUG })
  type?: ReportType;

  @Field()
  @Property({ required: true, enum: ReportStatus, default: ReportStatus.OPEN })
  status?: ReportStatus;

  @Field()
  @Property({ required: true })
  message!: string;
}

export const ReportModel = getModelForClass(Report, {
  schemaOptions: {
    timestamps: true,
  },
});
