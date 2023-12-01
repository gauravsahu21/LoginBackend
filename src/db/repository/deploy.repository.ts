/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BrandEntity } from '../entity/brands.entity';
import { CatalogueEntity } from '../entity/catalogue.entity';
import { CareerEntity } from '../entity/careers.entity';
import FileRepository from './fileserver.repository';
import logger from '../../connections/logger/logger';
import { Certificate } from '../entity/certificates.entity';
import { VideoEntity } from '../entity/videos.entity';

@Injectable()
export default class DeployRepo {
  constructor(private fileRepo: FileRepository) {}

  async saveKayempeeFile() {
    try {
      const brands = await BrandEntity.createQueryBuilder('brand')
        .select('brandId')
        .addSelect('brandName')
        .addSelect('website')
        .getRawMany();
      const certificate = await Certificate.find();
      const video = await VideoEntity.find();
      const data = { brands: brands, certificate: certificate, video: video };
      const jsonData = JSON.stringify(data);
      const buffer = Buffer.from(jsonData);
      const fileName = 'kayempee.json';
      const url = await this.fileRepo.uploadAndDownload(
        fileName,
        'website',
        buffer,
      );
      return url;
    } catch (error) {
      logger.info('Error occured in  saveFile.Repo');
      logger.error(error);
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }

  async saveBrandFile(brandId: string) {
    try {
      const catalogue = await CatalogueEntity.find({
        where: { brandId: brandId },
      });
      const brandName = await BrandEntity.findOne({ where: { brandId } });
      const data = { catelogues: catalogue };
      const jsonData = JSON.stringify(data);
      const buffer = Buffer.from(jsonData);
      const fileName = `${brandName.brandName}.json`;

      const url = await this.fileRepo.uploadAndDownload(
        fileName,
        'website',
        buffer,
      );
      return url;
    } catch (error) {
      logger.info('Error occured in  saveFile.Repo');
      logger.error(error);
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
}
