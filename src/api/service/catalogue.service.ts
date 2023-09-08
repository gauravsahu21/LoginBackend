import { Injectable } from "@nestjs/common";
import HttpResponse from "src/common/lib/http-response";
import logger from "src/connections/logger/logger";
import CatalogueRepository from "src/db/repository/catalogue.repository";

@Injectable()
export class CatalogueService {
  constructor(private readonly catalogueRepository: CatalogueRepository) {}

  async getCatalogue(brandId: string) {
    try {
      const list = await this.catalogueRepository.getCatalogue(brandId);
      return HttpResponse.success(
        list,
        'Catalogue Data Fetched succesfully',
        200,
      );
    } catch (error) {
      logger.error(error);
      return HttpResponse.error(error.message);
    }
  }
}