import { Injectable } from '@nestjs/common';
import { Brand } from 'src/common/dto/brands.dto';
import HttpResponse from 'src/common/lib/http-response';
import BrandsRepository from 'src/db/repository/brands.repository';

@Injectable()
export class BrandsService {
  constructor(private readonly brandsRepository: BrandsRepository) {}

  async addBrand(body: Brand) {
    try {
      const response = await this.brandsRepository.addBrand(body);
      if(response){
      return HttpResponse.success(null, 'Brands Data Fetched succesfully', 200);
    }
    else{
      return HttpResponse.error("Something Went wrong");
    }
    } catch (error) {
      return HttpResponse.error(error.message);
    }
  }
  async deleteBrand(brandId: string) {
    try {
      const response = await this.brandsRepository.deleteBrand(brandId);
      if(response){
      return HttpResponse.success(null, 'Brand Deleted succesfully', 200);}
      else{
        return HttpResponse.error("Something Went wrong");
      
      }
    } catch (error) {
      return HttpResponse.error(error.message);
    }
  }
}
