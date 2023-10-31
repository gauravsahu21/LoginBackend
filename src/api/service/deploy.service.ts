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
      const deployLink = await this.deploy.saveFile();
      if (deployLink == undefined || deployLink == 'not uploaded') {
        return HttpResponse.success(
          { link: deployLink },
          'Error while saving succesfully',
          404,
        );
      } else {
        return HttpResponse.success(
          { link: deployLink },
          'Saved succesfully',
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
