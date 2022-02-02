import { Report, ReportModel } from '../models/Report';
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  UseMiddleware,
} from 'type-graphql';
import { ReportInput, UpdateReportStatusInput } from './dto/reports.dto';
import { getAuthUser } from '../utils';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { CtxType } from '../types';
import { isAdmin } from '../middlewares/isAdmin';

@Resolver()
export class ReportResolver {
  @Query(() => Report, { nullable: true })
  @UseMiddleware(isAuthenticated)
  @UseMiddleware(isAdmin)
  async getReport(@Arg('id') id: string): Promise<Report | null> {
    return await ReportModel.findById(id).populate('user');
  }

  @Query(() => [Report])
  @UseMiddleware(isAuthenticated)
  @UseMiddleware(isAdmin)
  async getReports(): Promise<Report[]> {
    return await ReportModel.find().populate('user');
  }

  @Mutation(() => Report)
  @UseMiddleware(isAuthenticated)
  async createReport(
    @Arg('data') data: ReportInput,
    @Ctx() { req }: CtxType
  ): Promise<Report> {
    const authUser = await getAuthUser(req);
    const report = new ReportModel({
      message: data.message,
      user: authUser!,
    });
    return await report.save();
  }

  @Mutation(() => Report, { nullable: true })
  @UseMiddleware(isAuthenticated)
  @UseMiddleware(isAdmin)
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
