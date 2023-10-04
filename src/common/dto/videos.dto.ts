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

  @IsNumber()
  orderId:number;

  @IsString()
  title: string;

  @IsNumber()
  duration: number;

  @IsString()
  description: string;

  @IsString()
  videoLink: string;

  @IsString()
  s3link: string;

  @IsArray()
  tags: {};
}
