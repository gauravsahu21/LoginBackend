import {
  Body,
  Controller,
  Post,
  Query,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CatalogueService } from '../service/catalogue.service';
import { Catalogue } from 'src/common/dto/catalogue.dto';
import { PermissionsAuthGuard, WriteAccess } from '../jwt-auth.guard';

@Controller('catalogues')
export default class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

  @Get('/')
  async getCatalogue(@Query() brandId: any): Promise<any> {
    return this.catalogueService.getCatalogue();
  }
  @Post('/')
  @UseGuards(PermissionsAuthGuard)
  async addCatalogue(@Body() body: Catalogue): Promise<any> {
    return this.catalogueService.addCatalogue(body);
  }
  @Delete('/')
  @UseGuards(PermissionsAuthGuard)
  async deleteCatalogue(@Query() query: any): Promise<any> {
    return this.catalogueService.deleteCatalogue(query.catalogueId);
  }
}
