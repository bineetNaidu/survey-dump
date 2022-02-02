import { ReportStatus } from '../../models/Report';
import { InputType, Field } from 'type-graphql';

@InputType()
export class ReportInput {
  @Field()
  message!: string;
}

@InputType()
export class UpdateReportStatusInput {
  @Field()
  reportId!: string;

  @Field()
  status!: ReportStatus;
}
