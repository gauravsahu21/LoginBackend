/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Query, Delete, Req } from '@nestjs/common';
import {BrandsService} from '../service/brands.service';
import { Brand } from 'src/common/dto/brands.dto';


@Controller('brands')
export default class BrandController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post('/')
  async addBrand(@Body() body:Brand): Promise<any> {
    return this.brandsService.addBrand(body);
  }
  @Delete('/')
  async deleteBrand(@Query() query:any): Promise<any> {
    return this.brandsService.deleteBrand(query.brandId);
  }
}
