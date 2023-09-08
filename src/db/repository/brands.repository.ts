import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { BrandEntity } from '../entity/brands.entity';
@Injectable()
export default class BrandsRepository {
  async getBrands() {
    try {
      const brands = await BrandEntity.find();
      return brands;
    } catch (error) {
      console.log(error);
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
}
