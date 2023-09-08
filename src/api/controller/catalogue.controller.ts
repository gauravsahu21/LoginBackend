import { Body, Controller, Get, Query, Patch, Req } from '@nestjs/common';
import {CatalogueService} from '../service/catalogue.service';


@Controller('catalogue')
export default class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

  @Get('/')
  async getCatalogue(@Query() brandId: any): Promise<any> {
    return this.catalogueService.getCatalogue(brandId.brandId);
  }
}
