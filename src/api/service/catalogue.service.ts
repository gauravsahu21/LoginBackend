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
        'Catalogue Data Fetched successfully',
        200,
      );
    } catch (error) {
      logger.info('Error occurred in getCatalogue.Service');
      logger.error(error);
      return HttpResponse.error(error.message);
    }
  }
  async addCatalogue(body: Catalogue) {
    try {
      const response = await this.catalogueRepository.addCatalogue(body);
      if (response) {
        return HttpResponse.success(null, 'Catalogue Updated successfully', 200);
      } else {
        logger.info('Error occurred in addCatalogue.Service');
        return HttpResponse.error('Something Went wrong');
      }
    } catch (error) {
      logger.info('Error occurred in addCatalogue.Service');
      logger.error(error);
      return HttpResponse.error(error.message);
    }
  }

  async deleteCatalogue(catalogueId: string) {
    try {
      const response = await this.catalogueRepository.deleteCatalogue(
        catalogueId,
      );
      if (response) {
        return HttpResponse.success(null, 'Catalogue Deleted successfully', 200);
      } else {
        logger.info('Error occurred in deleteCatalogue.Service');
        return HttpResponse.error('Something Went wrong');
      }
    } catch (error) {
      logger.info('Error occurred in deleteCatalogue.Service');
      logger.error(error);
      return HttpResponse.error(error.message);
    }
  }
}
