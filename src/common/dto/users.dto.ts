/* eslint-disable prettier/prettier */
import {
    IsOptional,
    IsNotEmpty,
    IsString,
    ValidateNested,
    IsArray,
  } from 'class-validator';
 import { Type } from 'class-transformer';

 export class permissionsDto {
    @IsNotEmpty()
    @IsString()
    view: boolean;
  
    @IsNotEmpty()
    @IsString()
    addEdit: boolean;
  
    @IsNotEmpty()
    @IsString()
    update: boolean;
 }

 export class moduleDto {
     
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => permissionsDto)
    brand: permissionsDto;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => permissionsDto)
    dashBoard: permissionsDto;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => permissionsDto)
    catelogue: permissionsDto;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => permissionsDto)
    users: permissionsDto;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => permissionsDto)
    careers: permissionsDto;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => permissionsDto)
    video: permissionsDto;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => permissionsDto)
    certificates: permissionsDto;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => permissionsDto)
    profile: permissionsDto;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => permissionsDto)
    applicants: permissionsDto;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => permissionsDto)
    queries: permissionsDto;

    
 }
  export class UserDto {
    @IsOptional()
    profileId: string;
  
    @IsNotEmpty()
    @IsString()
    firstName: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    s3link:string;

    @IsString()
    imageId:string;
  
    @IsNotEmpty()
    @IsString()
    userId: string;
  
    @IsNotEmpty()
    @IsString()
    lastName: string;
  
    @IsNotEmpty()
    @IsString()
    emailId: string;
  
    @IsNotEmpty()
    @IsString()
    profileType: string;
  
    @IsNotEmpty()
    @Type(() => moduleDto)
    permissions: moduleDto;
  
 
    @IsArray()
    brandIds: any;
  }
  