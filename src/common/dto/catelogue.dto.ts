import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsNumber
} from 'class-validator';

import { Type } from 'class-transformer';

class quantityDto {
  @IsNotEmpty()
  @IsString()
  minimumOrder: string;
}

class specificationDto {
  @IsNotEmpty()
  @IsString()
  weight: string;

  @IsNotEmpty()
  @IsString()
  eggless: string;

  @IsNotEmpty()
  @IsString()
  form: string;
}

class tradeInformationDto {
  @IsNotEmpty()
  @IsString()
  supplyAbility: string;

  @IsNotEmpty()
  @IsString()
  deliveryTime: string;

  @IsNotEmpty()
  @IsString()
  domesticMarket: string;
}
class detailsDto {
  @IsNotEmpty()
  @Type(() => quantityDto)
  quantity: quantityDto;

  @IsNotEmpty()
  @Type(() => specificationDto)
  productSpecifications: specificationDto;

  @IsNotEmpty()
  @Type(() => tradeInformationDto)
  tradeInformation: tradeInformationDto;
}
export class Catalogue {
  @IsOptional()
  catelogueId: string;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsString()
  imageId: string;

  @IsNotEmpty()
  @IsString()
  brandId: string;

  @IsNotEmpty()
  @IsString()
  productCategory: string;

  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @IsNotEmpty()
  s3link: string;

  @IsNotEmpty()
  @Type(() => detailsDto)
  productDetails: detailsDto;
}