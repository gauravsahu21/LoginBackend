/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Query, Delete, UseGuards,Get } from '@nestjs/common';
import {BrandsService} from '../service/brands.service';
import { Brand, BrandIdDto } from 'src/common/dto/brands.dto';
import { WriteAccess } from '../jwt-auth.guard';


@Controller('brands')

export default class BrandController {
  constructor(private readonly brandsService: BrandsService) {}
  @Get('/viewall')
  async getBrands(): Promise<any> {
    return this.brandsService.getBrands();
  }
  @Post('/')
  async getBrandsByIds(@Body() body: BrandIdDto): Promise<any> {
    return this.brandsService.getBrandsByIds(body);
  }
  @Post('/')
  @UseGuards(WriteAccess)
  async addBrand(@Body() body:Brand): Promise<any> {
    return this.brandsService.addBrand(body);
  }
  @Delete('/')
  @UseGuards(WriteAccess)
  async deleteBrand(@Query() query:any): Promise<any> {
    return this.brandsService.deleteBrand(query.brandId);
  }
}
