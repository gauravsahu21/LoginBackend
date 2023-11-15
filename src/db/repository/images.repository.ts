/* eslint-disable prettier/prettier */
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { ImagesEntity } from '../entity/pictures.entity';
import { ImagesDto } from 'src/common/dto/images.dto';
import { KmpDatasource } from '../Datasource/KmpDatasource';
import logger from '../../connections/logger/logger';

@Injectable()
export default class ImagesRepository {
  async getImages() {
    try {
      let images: any;
      images = await ImagesEntity.find();
      return images;
    } catch (error) {
      logger.info('Error occured in getImages.Repo');
      logger.error(error);
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }

  async addImages(body: ImagesDto) {
    try {
      const existingImages = await ImagesEntity.findOne({
        where: { brandId: body.brandId },
      });

      if (existingImages) {
        existingImages.information = body.information;

        await existingImages.save();
      } else {
        const images = new ImagesEntity();
        images.brandId = body.brandId || uuidv4();
        images.information = body.information;
        await images.save();
      }
      return true;
    } catch (error) {
      logger.info('Error occured in addImages.Repo');
      logger.error(error);
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
}
