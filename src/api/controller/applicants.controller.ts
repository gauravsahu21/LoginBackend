/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Query,Delete, UseGuards } from '@nestjs/common';
import { EditApplicants } from 'src/common/dto/applicants.dto';
import { PermissionsAuthGuard, WriteAccess } from '../jwt-auth.guard';
import ApplicantsServices from '../service/applicants.service';

@Controller('applicants')
export default class ApplicantsController {
  constructor(private readonly applicants: ApplicantsServices) {}

  @Get('')
  @UseGuards(PermissionsAuthGuard)
  async getApplicants(@Query() jobId: any) {
    return this.applicants.getApplicants(jobId.jobId);
  }

  @Post('/')
  @UseGuards(PermissionsAuthGuard)
  async editApplicantStatus(@Body() editApplicant: EditApplicants) {
    return this.applicants.editApplicantStatus(editApplicant);
  }
}
