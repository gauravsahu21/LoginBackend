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
    read: string;
  
    @IsNotEmpty()
    @IsString()
    write: string;
  
    @IsNotEmpty()
    @IsString()
    delete: string;
  
    @IsNotEmpty()
    @IsString()
    update: string;
 }

 export class moduleDto {
     
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => permissionsDto)
    brands: permissionsDto;

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
    applicants: permissionsDto;

    @IsNotEmpty()
    @IsString()
    brandIds: any;
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
  
    @IsNotEmpty()
    @IsArray()
    brandIds: any;
  }
  