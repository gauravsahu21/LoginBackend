/* eslint-disable prettier/prettier */
import {
  IsString,
  IsInt,
  IsObject,
  IsArray,
  Min,
  Max,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

class ExperienceLevelDto {
  @Min(0)
  @Max(4)
  min: number;

  @Min(0)
  @Max(4)
  max: number;
}

class LocationDto {
  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;
}

class DescriptionDto {
  @IsArray()
  company: string;

  @IsArray()
  responbilities: string;

  @IsArray()
  education: string;

  @IsArray()
  additionalInfo: string;

  @IsArray()
  skills: string[];
}

export class CareerDto {
  @IsOptional()
  @IsString()
  careerId: string;

  @IsString()
  jobTitle: string;

  @IsObject()
  experienceLevel: ExperienceLevelDto;

  @IsInt()
  jobstatus: number;

  @IsInt()
  workMode: number;

  @IsNotEmpty()
  publishDate: Date;

  @IsNotEmpty()
  unPublishDate: Date;


  @IsObject()
  location: LocationDto;

  @IsInt()
  @Min(0)
  noOfOpenings: number;

  @IsInt()
  employementType: number;

  @IsString()
  department: string;

  @IsObject()
  description: DescriptionDto;
}
