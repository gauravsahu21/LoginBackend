/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Query, Patch, Req } from '@nestjs/common';
import {BrandsService} from '../service/brands.service';


@Controller('brands')
export default class BrandController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get('/')
  async getBrands(): Promise<any> {
    return this.brandsService.getBrands();
  }
}
