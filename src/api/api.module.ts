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

@Module({
  imports: [],
  controllers: [
    BrandController,
    CatalogueController,
    UserController,
    ContactUsController,
    CertificateController,
  ],
  providers: [
    JwtService,
    CatalogueRepository,
    UserService,
    CatalogueService,
    BrandsService,
    BrandsRepository,
    ContactUsService,
    ContactUsRepository,
    CertificateServices,
    UserRepository,
  ],
})
export class ApiModule {}
