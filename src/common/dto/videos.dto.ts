/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNumber,
  IsUrl,
  IsArray,
  IsOptional,
} from 'class-validator';

export class VideoDto {
  @IsString()
  @IsOptional()
  videoId: string;

  @IsString()
  orderId:number;

  @IsString()
  title: string;

  @IsString()
  duration:string;

  @IsString()
  description: string;

  @IsString()
  videoBucketId: string;

  @IsString()
  s3link: string;

  @IsString()
  tags:string;
}
