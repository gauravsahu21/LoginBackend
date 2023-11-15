/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import {ImagesDto} from '../../common/dto/images.dto'
import HttpResponse from 'src/common/lib/http-response';
import ImagesRepository from 'src/db/repository/images.repository';
import logger from '../../connections/logger/logger';

@Injectable()
export class ImagesService {
  constructor(private readonly imagesRepository: ImagesRepository) {}
  async getImages() {
    try {
      const list = await this.imagesRepository.getImages();
      return HttpResponse.success(list, 'Images Data Fetched succesfully', 200);
    } catch (error) {
      logger.info("Error occured in getImages.Service")
      logger.error(error)
      return HttpResponse.error(error.message);
    }
  }
  
  async addImages(body: ImagesDto) {
    try {
      const response = await this.imagesRepository.addImages(body);
      if (response) {
        return HttpResponse.success(
          null,
          'Images Data Updated succesfully',
          200,
        );
      } else {
        logger.info("Error occured in addImages.Service")
        return HttpResponse.error('Something Went wrong');
      }
    } catch (error) {
      logger.info("Error occured in addImages.Service")
      logger.error(error)
      return HttpResponse.error(error.message);
    }
  }
}
