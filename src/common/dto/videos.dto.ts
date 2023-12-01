/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNumber,
  IsUrl,
  IsArray,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class VideoDto {
  @IsString()
  @IsOptional()
  videoId: string;

  @IsNotEmpty()
  orderId:number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  duration:string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  videoBucketId: string;

  @IsString()
  @IsNotEmpty()
  s3link: string;

  @IsString()
  @IsNotEmpty()
  tags:string;

  @IsString()
  @IsNotEmpty()
  thumbnailId: string;

  @IsString()
  @IsNotEmpty()
  s3linkThumbnail: string;

  @IsString()
  @IsNotEmpty()
  brandId: string;
}
