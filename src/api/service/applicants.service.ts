/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ApplyJobDto, EditApplicants } from 'src/common/dto/applicants.dto';
import { AddOrEditCertificate } from 'src/common/dto/certificates.dto';
import HttpResponse from 'src/common/lib/http-response';
import ApplicantsRepository from 'src/db/repository/applicants.repository';
import logger from '../../connections/logger/logger';

@Injectable()
export default class ApplicantsServices {
  constructor(private readonly applicantRepository: ApplicantsRepository) {}

  async getApplicants(jobId:string) {
    try {
      const response = await this.applicantRepository.getApplicants(jobId);
      return HttpResponse.success(
         response ,
        'Applicants fetched succesfully',
        200,
      );
    } catch (error) {
      logger.info("Error occured in getApplicants.Service")
      logger.error(error)
      return HttpResponse.error(error.message);
    }
  }

  async editApplicantStatus(editApplicant: EditApplicants) {
    try {
      const response = await this.applicantRepository.editApplicantStatus(
        editApplicant,
      );
      return HttpResponse.success(
        response,
        'Status Updated Succesfully',
        200,
      );
    } catch (error) {
      logger.info("Error occured in editApplicantStatus.Service")
      logger.error(error)
      return HttpResponse.error(error.message);
    }
  }
  async applyJob(applicantDetails:ApplyJobDto){
    try{
     await this.applicantRepository.applyJob(applicantDetails); 
     return HttpResponse.success(
      null,
      'Job Applied Successfully',
      200,
    );
    }catch(error){
      logger.info("Error occured in editApplicantStatus.Service")
      logger.error(error)
      return HttpResponse.error(error.message);
    }
  }
}
