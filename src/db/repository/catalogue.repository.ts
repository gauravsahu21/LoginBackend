/* eslint-disable prettier/prettier */
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CatalogueEntity } from '../entity/catalogue.entity';
import { Catalogue } from 'src/common/dto/catelogue.dto';
import logger from '../../connections/logger/logger';

@Injectable()
export default class CatalogueRepository {
  async getCatalogue() {
    try {
      const catalogEntries = await CatalogueEntity.find();
      return catalogEntries;
    } catch (error) {
      logger.info("Error occured in getCatalogue.Repo")
      logger.error(error)
      throw new HttpException('Something Went wrong!', HttpStatus.NOT_FOUND);
    }
  }
  async addCatalogue(body: Catalogue) {
    const {catelogueId,imageId,s3link,productName,productDetails,productCategory,orderId,brandId} = body;
    try {
      const isExited = await CatalogueEntity.findOne({where:{catelogueId:catelogueId}});
      console.log(isExited,catelogueId);
      if(isExited && catelogueId) {
        isExited.catelogueId = catelogueId;
        isExited.imageId =  imageId;
        isExited.s3link = s3link;
        isExited.productName = productName;
        isExited.productDetails = productDetails;
        isExited.productCategory = productCategory;
        isExited.orderId = orderId;
        isExited.brandId = brandId;
        await CatalogueEntity.save(isExited);
      } else {
        const catelogue = new CatalogueEntity();
        catelogue.catelogueId = body.catelogueId || uuidv4();
        catelogue.imageId = body.imageId;
        catelogue.s3link = body.s3link;
        catelogue.productName = body.productName;
        catelogue.productDetails = body.productDetails;
        catelogue.productCategory = body.productCategory;
        catelogue.orderId = body.orderId;
        catelogue.brandId = body.brandId;
        await CatalogueEntity.save(catelogue);
      }
      return true;
    } catch (error) {
      logger.info("Error occured in addCatalogue.Repo")
      logger.error(error)
      throw new HttpException('Something Went wrong!', HttpStatus.NOT_FOUND);
    }
  }
  async deleteCatelogue(catelogueId: string) {
    try {
      const catelogue = await CatalogueEntity.find({
        where: { catelogueId: catelogueId },
      });
      if (catelogue) {
        await CatalogueEntity.delete(catelogueId);
        return true;
      }
      return false;
    } catch (error) {
      logger.info("Error occured in deleteCatelogue.Repo")
      logger.error(error)
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
}
