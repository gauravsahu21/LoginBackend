import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Catalogue } from '../entity/catalogue.entity';

@Injectable()
export default class CatalogueRepository {
  async getCatalogue(brandId: string) {
    try {
        console.log(brandId)
        const catalogEntries = await Catalogue.createQueryBuilder('catelogues')
        .where('catelogues.brandId = :brandId', { brandId })
        .getMany();
      return catalogEntries;
    } catch (error) {
        console.log(error);
      throw new HttpException(
        'Something Went wrong!',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
