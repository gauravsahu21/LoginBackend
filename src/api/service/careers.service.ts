import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CareerEntity } from 'src/db/entity/careers.entity';
import { CareerDto } from 'src/common/dto/careers.dto';
import CareersRepository from 'src/db/repository/careers.repository';
import HttpResponse from 'src/common/lib/http-response';

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
        return HttpResponse.error('Something Went wrong');
      }
    } catch (error) {
      return HttpResponse.error(error.message);
    }
  }

  async deleteCareer(careerId: string) {
    try {
      const response = await this.careerRepository.deleteCareer(careerId);
      if (response) {
        return HttpResponse.success(null, 'Job Deleted succesfully', 200);
      } else {
        return HttpResponse.error('Something Went wrong');
      }
    } catch (error) {
      return HttpResponse.error(error.message);
    }
  }
}