import { Body, Controller, Post, Query, Delete, Req } from '@nestjs/common';
import {CatalogueService} from '../service/catalogue.service';
import { Catalogue } from 'src/common/dto/catelogue.dto';


@Controller('catalogue')
export default class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

  @Post('/')
  async addCatalogue(@Body() body: Catalogue): Promise<any> {
    return this.catalogueService.addCatalogue(body);
  }
  @Delete('/')
  async deleteCatalogue(@Query() query: any): Promise<any> {
    return this.catalogueService.addCatalogue(query.catalogueId);
  }
}
