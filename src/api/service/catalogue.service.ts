/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Catalogue } from 'src/common/dto/catalogue.dto';
import HttpResponse from 'src/common/lib/http-response';
import CatalogueRepository from 'src/db/repository/catalogue.repository';
import logger from '../../connections/logger/logger';

@Injectable()
export class CatalogueService {
  constructor(private readonly catalogueRepository: CatalogueRepository) {}

  async getCatalogue() {
    try {
      const list = await this.catalogueRepository.getCatalogue();
      return HttpResponse.success(
        list,
        'Catalogue Data Fetched succesfully',
        200,
      );
    } catch (error) {
      logger.info('Error occured in getCatalogue.Service');
      logger.error(error);
      return HttpResponse.error(error.message);
    }
  }
  async addCatalogue(body: Catalogue) {
    try {
      const response = await this.catalogueRepository.addCatalogue(body);
      if (response) {
        return HttpResponse.success(null, 'Catalogue Updated succesfully', 200);
      } else {
        logger.info('Error occured in addCatalogue.Service');
        return HttpResponse.error('Something Went wrong');
      }
    } catch (error) {
      logger.info('Error occured in addCatalogue.Service');
      logger.error(error);
      return HttpResponse.error(error.message);
    }
  }

  async deleteCatelogue(catelogueId: string) {
    try {
      const response = await this.catalogueRepository.deleteCatalogue(
        catelogueId,
      );
      if (response) {
        return HttpResponse.success(null, 'Catelogue Deleted succesfully', 200);
      } else {
        logger.info('Error occured in deleteCatelogue.Service');
        return HttpResponse.error('Something Went wrong');
      }
    } catch (error) {
      logger.info('Error occured in deleteCatelogue.Service');
      logger.error(error);
      return HttpResponse.error(error.message);
    }
  }
}
