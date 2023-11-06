/* eslint-disable prettier/prettier */
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CareerEntity } from '../entity/careers.entity';
import { CareerDto } from 'src/common/dto/careers.dto';
import { Applicant } from '../entity/applicants.entity';
import { ApplyJobDto, EditApplicants } from 'src/common/dto/applicants.dto';
import logger from '../../connections/logger/logger';

@Injectable()
export default class ApplicantsRepository {
  async getApplicants(jobId: string) {
    try {
      
     const response = await Applicant.find({
        where: {
          careerId:jobId,
        }
      });

      return response;
    } catch (error) {
      logger.info("Error occured in getApplicants.Repo")
      logger.error(error)
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }

  async editApplicantStatus(editApplicant: EditApplicants) {
    const { applicantId, applicantStatus, careerId } = editApplicant;
    try {
      const applicant = await Applicant.findOne({
        where: { careerId: careerId, applicantId: applicantId },
      });
      if (!applicant)
        throw new HttpException('Applicant not found!', HttpStatus.NOT_FOUND);
      applicant.applicantStatus = applicantStatus;
      applicant.save();
      return true;
    } catch (error) {
      logger.info("Error occured in editApplicantStatus.Repo")
      logger.error(error)
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }

  async applyJob(applicantDetails:ApplyJobDto){
    try{
      const newJob=new Applicant();
       newJob.applicantId= uuidv4();
       newJob.applicantName=applicantDetails.applicantName;
       newJob.contact=applicantDetails.contact;
       newJob.experienceinfo=applicantDetails.experienceinfo;
       newJob.resumeId=applicantDetails.resumeId;
       newJob.s3Link=applicantDetails.s3Link;
       newJob.appliedOn=applicantDetails.appliedOn;
       newJob.careerId=applicantDetails.careerId;
       newJob.applicantStatus=applicantDetails.applicantStatus;
      await newJob.save();

    }catch(error){
      logger.info("Error occured in applyJob.Repo")
      logger.error(error)
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
}
