/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Brand, BrandIdDto } from 'src/common/dto/brands.dto';
import HttpResponse from 'src/common/lib/http-response';
import BrandsRepository from 'src/db/repository/brands.repository';
import logger from '../../connections/logger/logger';

@Injectable()
export class BrandsService {
  constructor(private readonly brandsRepository: BrandsRepository) {}
  async getBrands(user:any) {
    try {
      const list = await this.brandsRepository.getBrands(user);
      return HttpResponse.success(list, 'Brands Data Fetched succesfully', 200);
    } catch (error) {
      logger.info("Error occured in getBrands.Service")
      logger.error(error)
      return HttpResponse.error(error.message);
    }
  }
  
  async addBrand(body: Brand) {
    try {
      const response = await this.brandsRepository.addBrand(body);
      if (response) {
        return HttpResponse.success(
          null,
          'Brands Data Updated succesfully',
          200,
        );
      } else {
        logger.info("Error occured in addBrand.Service")
        return HttpResponse.error('Something Went wrong');
      }
    } catch (error) {
      logger.info("Error occured in addBrand.Service")
      logger.error(error)
      return HttpResponse.error(error.message);
    }
  }
  async deleteBrand(brandId: string) {
    try {
      const response = await this.brandsRepository.deleteBrand(brandId);
      if (response) {
        return HttpResponse.success(null, 'Brand Deleted succesfully', 200);
      } else {
        logger.info("Error occured in deleteBrand.Service")
        return HttpResponse.error('Something Went wrong');
      }
    } catch (error) {
      logger.info("Error occured in deleteBrand.Service")
      logger.error(error)
      return HttpResponse.error(error.message);
    }
  }
}
