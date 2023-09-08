import { Injectable } from "@nestjs/common";
import HttpResponse from "src/common/lib/http-response";
import logger from "src/connections/logger/logger";
import BrandsRepository from "src/db/repository/brands.repository";

@Injectable()
export class BrandsService {
  constructor(private readonly brandsRepository: BrandsRepository) {}

  async getBrands() {
    try {
      const list = await this.brandsRepository.getBrands();
      return HttpResponse.success(
        list,
        'Brands Data Fetched succesfully',
        200,
      );
    } catch (error) {
      logger.error(error);
      return HttpResponse.error(error.message);
    }
  }
}