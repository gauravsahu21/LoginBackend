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
  contactUsType: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  countryCode: string;

  @IsNotEmpty()
  @IsString()
  contactNumber: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  connectorName: string;

  @IsNotEmpty()
  contactSubject: any;

  @IsNotEmpty()
  contactTime: Date;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0,1])
  connectStatus: number;

  @IsNotEmpty()
  @IsString()
  additionalNotes: string;
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
