/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserController from './controller/user.controller';
import CertificateController from './controller/certificates.controller';
import BrandController from './controller/brands.controller';
import CatalogueController from './controller/catalogue.controller';
import { ContactUsController } from './controller/contact.controller';

import UserService from './service/user.service';
import CertificateServices from './service/certificates.service';
import { BrandsService } from './service/brands.service';
import { CatalogueService } from './service/catalogue.service';
import { ContactUsService } from './service/contact.service';

import UserRepository from 'src/db/repository/user.repository';
import BrandsRepository from 'src/db/repository/brands.repository';
import CatalogueRepository from 'src/db/repository/catalogue.repository';
import ContactUsRepository from 'src/db/repository/message.repository';
import { CareersController } from './controller/careers.controller';
import { CareersService } from './service/careers.service';
import CareersRepository from 'src/db/repository/careers.repository';
import { VideoController } from './controller/videos.controller';
import { VideoService } from './service/videos.service';
import VideoRepository from 'src/db/repository/videos.repository';
import FileRepository from 'src/db/repository/fileserver.repository';
import { FileUploadController } from './controller/file.controller';
import { FileUploadService } from './service/file-upload.service';
import UsersRepository from 'src/db/repository/users.repository';
import UsersController from './controller/users.controller';
import { UsersService } from './service/users.service';
@Module({
  imports: [],
  controllers: [
    BrandController,
    CatalogueController,
    UserController,
    ContactUsController,
    CertificateController,
    CareersController,
    VideoController,
    FileUploadController,
    UsersController
  ],
  providers: [
    JwtService,
    CatalogueRepository,
    UserService,
    CatalogueService,
    BrandsService,
    CareersService,
    VideoService,
    BrandsRepository,
    ContactUsService,
    ContactUsRepository,
    CertificateServices,
    UserRepository,
    CareersRepository,
    VideoRepository,
    FileUploadService,
    FileRepository,
    UsersRepository,
    UsersService 
  ],
})
export class ApiModule {}
