import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CatalogueEntity } from '../entity/catalogue.entity';
import { Catalogue } from 'src/common/dto/catelogue.dto';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export default class CatalogueRepository {

  async getCatalogue(brandId: string) {
    try {
        console.log(brandId)
        const catalogEntries = await CatalogueEntity.createQueryBuilder('catelogues')
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
  async addCatalogue(body: Catalogue) {
    try {
      const catelogue = new CatalogueEntity();
      catelogue.catelogueId = body.catalogueId || uuidv4();
      catelogue.imageId = body.imageId;
      catelogue.productName = body.productName;
      catelogue.productDetails = body.productDetails;
      catelogue.productCategory = body.productCategory;
      catelogue.orderId = body.orderId;
      catelogue.brandId = body.brandId;
      catelogue.save()
      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException('Something Went wrong!', HttpStatus.NOT_FOUND);
    }
  }
  async deleteCatelogue(catelogueId: string) {
    try {
      const catelogue = await CatalogueEntity.find({ where: { catelogueId: catelogueId } });
      if (catelogue) {
        await CatalogueEntity.delete(catelogueId);
        return true
      }
      return false;
    } catch (error) {
      console.log(error);
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
}