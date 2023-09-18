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
  import { Catalogue } from 'src/common/dto/catelogue.dto';
  import { WriteAccess } from '../jwt-auth.guard';
  
  @Controller('users')
  export default class UserController {
    constructor(private readonly catalogueService: CatalogueService) {}
  
    @Get('/')
    @UseGuards(WriteAccess)
    async getCatalogue(): Promise<any> {
      return this.catalogueService.getCatalogue();
    }
    @Post('/')
    @UseGuards(WriteAccess)
    async addCatalogue(@Body() body: Catalogue): Promise<any> {
      return this.catalogueService.addCatalogue(body);
    }
    @Delete('/')
    @UseGuards(WriteAccess)
    async deleteCatalogue(@Query() query: any): Promise<any> {
      return this.catalogueService.deleteCatelogue(query.catalogueId);
    }
  }
  