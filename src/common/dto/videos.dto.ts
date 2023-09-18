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
  title: string;

  @IsNumber()
  duration: number;

  @IsString()
  description: string;

  @IsUrl()
  videoLink: string;

  @IsString({ each: true })
  tags: string[];
}
