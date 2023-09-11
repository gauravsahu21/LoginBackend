import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { BrandEntity } from '../entity/brands.entity';
import { Brand } from 'src/common/dto/brands.dto';

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
  async addBrand(body: Brand) {
    try {
      const brand = new BrandEntity();
      brand.brandId = body.brandId || uuidv4();
      brand.brandName = body.brandName;
      brand.productCategory = body.productCategory;
      brand.website = body.website;
      brand.imageId = body.imageId;
      brand.save();
      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
  async deleteBrand(brandId: string) {
    try {
      const brand = await BrandEntity.find({ where: { brandId: brandId } });
      if (brand) {
        await BrandEntity.delete(brandId);
        return true;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
}
