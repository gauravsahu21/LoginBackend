/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserController from './controller/login.controller';


import UserService from './service/login.service';


import UserRepository from 'src/db/repository/login.repository';

import FileRepository from 'src/db/repository/fileserver.repository';
import { FileUploadController } from './controller/file.controller';
import { FileUploadService } from './service/file-upload.service';



import ForgetController from './controller/forgetpassword.controller';
import { ForgetPassService } from './service/forgetpassword.service';
import ForgetPassRepository from 'src/db/repository/forgetpassword.repository';

@Module({
  imports: [],
  controllers: [
   
    UserController,
 
    FileUploadController,
  
    ForgetController,
    
  ],
  providers: [
    JwtService,
    
    UserService,
   
    UserRepository,
   
    FileUploadService,
    FileRepository,
    
    ForgetPassService,
    ForgetPassRepository,
  ],
})
export class ApiModule {}
