/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Query, Delete, UseGuards,Get, Request } from '@nestjs/common';
import {BrandsService} from '../service/brands.service';
import { Brand, BrandIdDto } from 'src/common/dto/brands.dto';
import { PermissionsAuthGuard, WriteAccess } from '../jwt-auth.guard';
@Controller('brands')

export default class BrandController {
  constructor(private readonly brandsService: BrandsService) {}
  @Get('/')
  @UseGuards(PermissionsAuthGuard)
  async getBrands(@Request() request:any): Promise<any> {
    const {user} = request;
    return this.brandsService.getBrands(user)
  }
  @Post('/')
  @UseGuards(PermissionsAuthGuard)
  async addBrand(@Body() body:Brand): Promise<any> {
    return this.brandsService.addBrand(body);
  }
  @Delete('/')
  @UseGuards(PermissionsAuthGuard)
  async deleteBrand(@Query() query:any): Promise<any> {
    return this.brandsService.deleteBrand(query.brandId);
  }
}
