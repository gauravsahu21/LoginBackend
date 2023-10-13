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

@Injectable()
export default class CareersRepository {
  async getAllCareers() {
    try {
      const response = await CareerEntity.find();
      const applicant = await Applicant.createQueryBuilder('people')
        .select('careerId')
        .addSelect('applicantStatus')
        .getRawMany();

      const outputObject = {};

      applicant.forEach((item) => {
        const { careerId, applicantStatus } = item;
        if (!outputObject[careerId]) {
          outputObject[careerId] = {};
        }

        if (!outputObject[careerId][applicantStatus]) {
          outputObject[careerId][applicantStatus] = 0;
        }

        outputObject[careerId][applicantStatus]++;
      });

      for (let i = 0; i < response.length; i++) {
        const careerId = response[i].careerId;

        // Check if dataObject has a matching key for the current careerId
        if (outputObject[careerId]) {
          // Update the object with the values from dataObject
          response[i]['candidatesstatus'] = outputObject[careerId];
        }
      }

      console.log(outputObject, '!');
      console.log(applicant, '!@#');
      return response;
    } catch (error) {
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }

  async createCareer(createCareerDto: CareerDto) {
    const {
      careerId,
      jobTitle,
      department,
      experienceLevel,
      location,
      noOfOpenings,
      employementType,
      workMode,
      description,
    } = createCareerDto;
    try {
      const isExited = await CareerEntity.findOne({ where: { careerId } });
      if (isExited && careerId) {
        isExited.jobTitle = jobTitle;
        isExited.department = department;
        isExited.experienceLevel = experienceLevel;
        isExited.location = location;
        isExited.publishDate = new Date();
        isExited.unPublishDate = new Date();
        isExited.noOfOpenings = noOfOpenings;
        isExited.employementType = employementType;
        isExited.workMode = workMode;
        isExited.description = description;
        await CareerEntity.save(isExited);
      } else {
        const career = new CareerEntity();
        career.careerId = uuidv4();
        career.jobTitle = jobTitle;
        career.department = department;
        career.experienceLevel = experienceLevel;
        career.location = location;
        career.noOfOpenings = noOfOpenings;
        career.publishDate = new Date();
        career.unPublishDate = new Date();
        career.employementType = employementType;
        career.workMode = workMode;
        career.description = description;
        await CareerEntity.save(career);
      }
      return true;
    } catch (error) {
      console.log(error.message, 'adsdasdasdasd');
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }

  async deleteCareer(careerId: string) {
    try {
      const isExited = await CareerEntity.findOne({ where: { careerId } });
      if (isExited) {
        const response = await CareerEntity.delete(careerId);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
}
