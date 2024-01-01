/* eslint-disable prettier/prettier */
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class contactUsDto {
  @IsNotEmpty()
  @IsString()
  firstName :string;

  @IsNotEmpty()
  @IsString()
  lastName :string;

  @IsNotEmpty()
  @IsString()
  messages: string;

  @IsNotEmpty()
  phone:any;

  @IsNotEmpty()
  email:any;
}

export class enquiriesDto {
  fromDate: any;

  toDate: any;

  @IsNotEmpty()
  connectStatus: number[];
  // @IsNotEmpty()  reportProfileType: number[];

  @IsNotEmpty()
  @IsNumber()
  page: number;

  @IsNotEmpty()
  @IsArray()
  type:string[];
}

export class updateEnquiryDto {
  @IsNotEmpty()
  @IsString()
  contactUsId: string;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  connectStatus: number;
}
