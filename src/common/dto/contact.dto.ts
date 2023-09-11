/* eslint-disable prettier/prettier */
import {IsBoolean, IsIn, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class contactUsDto{

    @IsNotEmpty()
    @IsString()
    contactUsId:string;
    
    @IsNotEmpty()
    @IsString()
    contactUsType:string;

    @IsNotEmpty()
    @IsString()
    message:string;
 
    @IsNotEmpty()
    @IsString()
    countryCode:string;

    @IsNotEmpty()
    @IsString()
    contactNumber:string;

    @IsNotEmpty()
    @IsString()
    email:string;

    
    @IsNotEmpty()
    @IsString()
    connectorName:string;

    @IsNotEmpty()
    contactSubject:any;

    @IsNotEmpty()
    contactTime:Date;

    @IsNotEmpty()
    @IsNumber()
    connectStatus:number;

    @IsNotEmpty()
    @IsString()
    additionalNotes:string;
}

export class enquiriesDto{

    fromDate:any;

    toDate:any;

    @IsNotEmpty()
    @IsNumber()
    connectStatus:number;

    @IsNotEmpty()
    @IsNumber()
    page:number;
  
}

export class updateEnquiryDto{
    @IsNotEmpty()
    @IsString()
    contactUsId:string;
  
    @IsNotEmpty()
    @IsNumber()
    @IsIn([0,1])
    connectStatus:number;
  
  }
  