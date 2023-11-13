/* eslint-disable prettier/prettier */
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { BrandEntity } from '../entity/brands.entity';
import { Brand, BrandIdDto } from 'src/common/dto/brands.dto';
import { In } from 'typeorm';
import { Authorization } from '../entity/authorization.entity';
import { KmpDatasource } from '../Datasource/KmpDatasource';
import logger from '../../connections/logger/logger';

@Injectable()
export default class BrandsRepository {
  async getBrands(user:any) {
    try {
      let brands:any;
      if(user.profileType === 'admin' || user.profileType === 'Management' || user.profileType ==='Brand Representative'){
      brands = await BrandEntity.find();
      }else{
        brands = await BrandEntity.find({where:{brandId:In(user.brandIds)}})
      }
      return brands;
    } catch (error) {
      logger.info("Error occured in getBrands.Repo")
      logger.error(error)
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
  async BrandIdDto(brandIds: string[]) {
    try {
      const brands = await BrandEntity.find({
        where: {
          brandId: In(brandIds),
        },
      });
      return brands;
    } catch (error) {
      logger.info("Error occured in BrandIdDto.Repo")
      logger.error(error)
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
  async addBrand(body: Brand) {
    try {
      const brand = new BrandEntity();
      brand.brandId = body.brandId || uuidv4();
      brand.brandName = body.brandName;
      brand.Description=body.Description;
      brand.productCategory = body.productCategory;
      brand.website = body.website;
      brand.s3Link = body.s3Link;
      brand.imageId = body.imageId;
      brand.save();
      return true;
    } catch (error) {
      logger.info("Error occured in addBrand.Repo")
      logger.error(error)
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
  async deleteBrand(brandId: string): Promise<boolean> {
    try {
      const result = await KmpDatasource.manager.transaction(
        async (transactionalEntityManager) => {
          const brand = await transactionalEntityManager
            .createQueryBuilder(BrandEntity, 'brand')
            .where('brand.brandId = :brandId', { brandId })
            .getOne();
  
          if (brand) {
            await transactionalEntityManager
              .createQueryBuilder()
              .update(Authorization)
              .set({
                brandIds: () =>
                  `JSON_REMOVE(brandIds, JSON_UNQUOTE(JSON_SEARCH(brandIds, 'one', '${brandId}')))`,
              })
              .where(`JSON_SEARCH(brandIds, 'one', '${brandId}') IS NOT NULL`)
              .execute();
  
            await transactionalEntityManager.delete(BrandEntity, brandId);
  
            return true; // Indicates success
          } else {
            return false; // Indicates brand not found
          }
        }
      );
  
      return result; // Return true for success, false for brand not found
    } catch (error) {
      logger.info("Error occured in deleteBrand.Repo")
      logger.error(error)
      throw new Error('Something went wrong!');
    }
  }
}
