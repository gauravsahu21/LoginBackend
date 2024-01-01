/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Query,Delete, UseGuards, UseInterceptors,  UploadedFiles } from '@nestjs/common';
import { ApplyJobDto, EditApplicants } from 'src/common/dto/applicants.dto';
import { PermissionsAuthGuard, WriteAccess } from '../jwt-auth.guard';
import ApplicantsServices from '../service/applicants.service';
import {
  FilesInterceptor,
} from '@nestjs/platform-express';

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

  @Post('/apply')
  @UseInterceptors(FilesInterceptor('resume'))
  async applyJob(@Body() applicantDetails:ApplyJobDto, @UploadedFiles() resume: Array<Express.Multer.File>,) {
   return this.applicants.applyJob(applicantDetails,resume);
  }
}
