/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CareerEntity } from 'src/db/entity/careers.entity';
import { CareerDto } from 'src/common/dto/careers.dto';
import CareersRepository from 'src/db/repository/careers.repository';
import HttpResponse from 'src/common/lib/http-response';
import logger from '../../connections/logger/logger';

@Injectable()
export class CareersService {
  constructor(private readonly careerRepository: CareersRepository) {}

  async getAllCareers() {
    try {
      let response = await this.careerRepository.getAllCareers();
      return HttpResponse.success(
        response,
        'Job Data Fetched succesfully',
        200,
      );
    } catch (error) {
      logger.info("Error occured in getAllCareers.Service")
      logger.error(error)
      return HttpResponse.error(error.message);
    }
  }

  async createCareer(createCareerDto: CareerDto) {
    try {
      let response = await this.careerRepository.createCareer(createCareerDto);
      if (response) {
        return HttpResponse.success(
          null,
          'Job Data Updated succesfully',
          200,
        );
      } else {
        logger.info("Error occured in getCareersById.Service")
        return HttpResponse.error('Something Went wrong');
      }
    } catch (error) {
      logger.info("Error occured in createCareer.Service")
      logger.error(error)
      return HttpResponse.error(error.message);
    }
  }

  async deleteCareer(careerId: string) {
    try {
      const response = await this.careerRepository.deleteCareer(careerId);
      if (response) {
        return HttpResponse.success(null, 'Job Deleted succesfully', 200);
      } else {
        logger.info("Error occured in getCareersById.Service")
        return HttpResponse.error('Something Went wrong');
      }
    } catch (error) {
      logger.info("Error occured in deleteCareer.Service")
      logger.error(error)
      return HttpResponse.error(error.message);
    }
  }

  async getCareersById(careerId: string) {
    try {
      const response = await this.careerRepository.getCareersById(careerId);
      if (response) {
        return HttpResponse.success(response, 'Job Data Fetched succesfully', 200);
      } else {
        logger.info("Error occured in getCareersById.Service")
        return HttpResponse.error('Something Went wrong');
      }
    } catch (error) {
      logger.info("Error occured in getCareersById.Service")
      logger.error(error)
      return HttpResponse.error(error.message);
    }
  }
}
