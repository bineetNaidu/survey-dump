import { Report, ReportModel } from '../models/Report';
import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { ReportInput, UpdateReportStatusInput } from './dto/reports.dto';

@Resolver()
export class ReportResolver {
  @Query(() => Report, { nullable: true })
  async getReport(@Arg('id') id: string): Promise<Report | null> {
    return await ReportModel.findById(id);
  }

  @Query(() => [Report])
  async getReports(): Promise<Report[]> {
    return await ReportModel.find();
  }

  @Mutation(() => Report)
  async createReport(@Arg('data') data: ReportInput): Promise<Report> {
    const report = new ReportModel(data);
    return await report.save();
  }

  @Mutation(() => Report, { nullable: true })
  async updateReportStatus(
    @Arg('data') data: UpdateReportStatusInput
  ): Promise<Report | null> {
    const report = await ReportModel.findById(data.reportId);
    if (report) {
      report.status = data.status;
      await report.save();
      return report;
    }
    return null;
  }
}
