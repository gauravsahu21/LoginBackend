/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import HttpResponse from 'src/common/lib/http-response';
import DeployRepo from 'src/db/repository/deploy.repository';
import logger from '../../connections/logger/logger';


@Injectable()
export class DeployService {
  constructor(private readonly deploy: DeployRepo) {}
  async saveFile() {
    try {
      const deployLink = await this.deploy.saveKayempeeFile();
      if (deployLink == undefined || deployLink == 'not uploaded') {
        return HttpResponse.success(
          {},
          'Error while saving succesfully',
          404,
        );
      } else {
        return HttpResponse.success(
          {},
          'Website Information fetched successfully',
          200,
        );
      }
    } catch(error) {
      logger.info("Error occured in saveFileDeploy.Service")
      logger.error(error)
      return HttpResponse.error('Error While Uploading/Downloading');
    }
  }
  async saveBrandFile(brandId:string) {
    try {
      const deployLink = await this.deploy.saveBrandFile(brandId);
      if (deployLink == undefined || deployLink == 'not uploaded') {
        return HttpResponse.success(
          {},
          'Error while saving succesfully',
          404,
        );
      } else {
        return HttpResponse.success(
          {},
          'Website Information fetched successfully',
          200,
        );
      }
    } catch(error) {
      logger.info("Error occured in saveFileDeploy.Service")
      logger.error(error)
      return HttpResponse.error('Error While Uploading/Downloading');
    }
  }
}
