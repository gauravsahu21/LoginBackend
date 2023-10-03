/* eslint-disable prettier/prettier */
import {
    IsNotEmpty, IsString,
  } from 'class-validator';
  
 
  
  export class newpasswordDto{
    @IsNotEmpty()
    @IsString()
    password:string

    @IsNotEmpty()
    @IsString()
    email:string
  }
