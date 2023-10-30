/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BrandEntity } from '../entity/brands.entity';
import { CatalogueEntity } from '../entity/catalogue.entity';
import { CareerEntity } from '../entity/careers.entity';
import FileRepository from './fileserver.repository';
import logger from '../../connections/logger/logger';

@Injectable()
export default class DeployRepo {
  constructor(private fileRepo:FileRepository) {}

  async saveFile() {
    try {
      const brands = await BrandEntity.find();
      const catalogue = await CatalogueEntity.find();
      const careers = await CareerEntity.find();
      const data= { brands: brands, catalogue: catalogue, careers: careers };
      const jsonData = JSON.stringify(data);
      const buffer = Buffer.from(jsonData);  
     const url=await this.fileRepo.uploadAndDownload("websitedata","website",buffer)
     return url;
    } catch(error) {
      logger.info("Error occured in  saveFile.Repo")
      logger.error(error)
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
}
