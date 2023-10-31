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
import logger from '../../connections/logger/logger';

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
      const statusMap = {
        '0': 'applied',
        '1': 'shortlist',
        '2': 'interview',
        '3': 'offer'
      };

      applicant.forEach((item) => {
        const { careerId, applicantStatus } = item;
        if (!outputObject[careerId]) {
          outputObject[careerId] = { 'applied': 0, 'shortlist': 0, 'interview': 0, 'offer': 0 };
        }

        if (!outputObject[careerId][applicantStatus]) {
          outputObject[careerId][statusMap[applicantStatus]] = 0;
        }

        outputObject[careerId][statusMap[applicantStatus]]++;
      });

     

      

      for (let i = 0; i < response.length; i++) {
        const careerId = response[i].careerId;
        if (outputObject[careerId]) {
          response[i]['candidatesstatus'] = outputObject[careerId];
        } else {
          response[i]['candidatesstatus'] = { 'applied': 0, 'shortlist': 0, 'interview': 0, 'offer': 0 };
        }
      }
      return response;
    } catch (error) {
      logger.info("Error occured in getAllCareers.Repo")
      logger.error(error)
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }

  async createCareer(createCareerDto: CareerDto) {
    const {
      careerId,
      jobTitle,
      jobstatus,
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
        isExited.jobstatus= jobstatus
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
        career.careerId = uuidv4().substring(0, 6);
        career.jobTitle = jobTitle;
        career.jobstatus = jobstatus;
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
      logger.info("Error occured in createCareer.Repo")
      logger.error(error)
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
      logger.info("Error occured in deleteCareer.Repo")
      logger.error(error)
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }

  async getCareersById(careerId: string) {
    try {
      const response = await CareerEntity.findOne({ where: { careerId } });
      const applicant = await Applicant.createQueryBuilder('people')
        .select('careerId')
        .addSelect('applicantStatus')
        .getRawMany();

      const outputObject = {};
      const statusMap = {
        '0': 'applied',
        '1': 'shortlist',
        '2': 'interview',
        '3': 'offer'
      };

      applicant.forEach((item) => {
        const { careerId, applicantStatus } = item;
        if (!outputObject[careerId]) {
          outputObject[careerId] = { 'applied': 0, 'shortlist': 0, 'interview': 0, 'offer': 0 };
        }

        if (!outputObject[careerId][applicantStatus]) {
          outputObject[careerId][statusMap[applicantStatus]] = 0;
        }

        outputObject[careerId][statusMap[applicantStatus]]++;
      });

     
        if (outputObject[response.careerId]) {
          response['candidatesstatus'] = outputObject[response.careerId];
        } else {
          response['candidatesstatus'] = { 'applied': 0, 'shortlist': 0, 'interview': 0, 'offer': 0 };
        }

      return response;
    } catch (error) {
      logger.info("Error occured in getCareersById.Repo")
      logger.error(error)
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }

}
