import { IsOptional, IsNotEmpty } from 'class-validator';

export class ImagesDto {
  @IsNotEmpty()
  brandId: string;

  @IsOptional()
  information: string[]; 
}
