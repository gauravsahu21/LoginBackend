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
