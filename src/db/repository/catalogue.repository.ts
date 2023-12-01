/* eslint-disable prettier/prettier */
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CatalogueEntity } from '../entity/catalogue.entity';
import { Catalogue } from 'src/common/dto/catalogue.dto';
import logger from '../../connections/logger/logger';

@Injectable()
export default class CatalogueRepository {
  async getCatalogue() {
    try {
      const catalogEntries = await CatalogueEntity.find();
      return catalogEntries;
    } catch (error) {
      logger.info('Error occurred in getCatalogue.Repo');
      logger.error(error);
      throw new HttpException('Something Went wrong!', HttpStatus.NOT_FOUND);
    }
  }
  async addCatalogue(body: Catalogue) {
    const {
      catalogueId,
      imageId,
      s3link,
      productName,
      productDetails,
      productCategory,
      orderId,
      brandId,
      videoBucketId,
      s3linkVideo,
      thumbnailId,
      s3linkThumbnail,
    } = body;
    try {
      const isExited = await CatalogueEntity.findOne({
        where: { catelogueId: catalogueId },
      });
      console.log(isExited, catalogueId);
      if (isExited && catalogueId) {
        isExited.catelogueId = catalogueId;
        isExited.imageId = imageId;
        isExited.s3link = s3link;
        isExited.productName = productName;
        isExited.productDetails = productDetails;
        isExited.productCategory = productCategory;
        isExited.orderId = orderId;
        isExited.brandId = brandId;
        isExited.videoBucketId = videoBucketId;
        isExited.thumbnailId = thumbnailId;
        isExited.s3linkVideo = s3linkVideo;
        isExited.s3linkThumbnail = s3linkThumbnail;
        await CatalogueEntity.save(isExited);
      } else {
        const catalogue = new CatalogueEntity();
        catalogue.catelogueId = body.catalogueId || uuidv4();
        catalogue.imageId = body.imageId;
        catalogue.s3link = body.s3link;
        catalogue.productName = body.productName;
        catalogue.productDetails = body.productDetails;
        catalogue.productCategory = body.productCategory;
        catalogue.orderId = body.orderId;
        catalogue.brandId = body.brandId;
        catalogue.videoBucketId =  body.videoBucketId;
        catalogue.thumbnailId =  body.thumbnailId;
        catalogue.s3linkVideo =  body.s3linkVideo;
        catalogue.s3linkThumbnail =  body.s3linkThumbnail;
        await CatalogueEntity.save(catalogue);
      }
      return true;
    } catch (error) {
      logger.info('Error occurred in addCatalogue.Repo');
      logger.error(error);
      throw new HttpException('Something Went wrong!', HttpStatus.NOT_FOUND);
    }
  }
  async deleteCatalogue(catalogueId: string) {
    try {
      const catalogue = await CatalogueEntity.find({
        where: { catelogueId: catalogueId },
      });
      if (catalogue) {
        await CatalogueEntity.delete(catalogueId);
        return true;
      }
      return false;
    } catch (error) {
      logger.info('Error occurred in deleteCatalogue.Repo');
      logger.error(error);
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
}
