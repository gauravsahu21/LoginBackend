import { Injectable } from '@nestjs/common';
import { Catalogue } from 'src/common/dto/catelogue.dto';
import HttpResponse from 'src/common/lib/http-response';
import CatalogueRepository from 'src/db/repository/catalogue.repository';

@Injectable()
export class CatalogueService {
  constructor(private readonly catalogueRepository: CatalogueRepository) {}

  async addCatalogue(body: Catalogue) {
    try {
      const response = await this.catalogueRepository.addCatalogue(body);
      if (response) {
        return HttpResponse.success(null, 'Catalogue Updated succesfully', 200);
      } else {
        return HttpResponse.error('Something Went wrong');
      }
    } catch (error) {
      return HttpResponse.error(error.message);
    }
  }

  async deleteCatelogue(catelogueId: string) {
    try {
      const response = await this.catalogueRepository.deleteCatelogue(catelogueId);
      if(response){
      return HttpResponse.success(null, 'Catelogue Deleted succesfully', 200);}
      else{
        return HttpResponse.error("Something Went wrong");
      
      }
    } catch (error) {
      return HttpResponse.error(error.message);
    }
  }
}
