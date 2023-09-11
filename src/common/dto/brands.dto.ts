import {
  IsOptional,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
class categoryDto {
  @IsNotEmpty()
  @IsString()
  categoryName: string;
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
export class Brand {
  @IsOptional()
  brandId: string;

  @IsNotEmpty()
  @IsString()
  brandName: string;

  @IsNotEmpty()
  @IsString()
  imageId: string;

  @IsNotEmpty()
  @IsString()
  website: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => categoryDto)
  productCategory: categoryDto[];
}