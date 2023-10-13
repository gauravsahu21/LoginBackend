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
import { EditApplicants } from 'src/common/dto/applicants.dto';

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
      console.log(error);
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
      console.log(error.message, 'adsdasdasdasd');
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
}
