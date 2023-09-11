/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import UserController from './controller/user.controller';
import UserService from './service/user.service';
import UserRepository from 'src/db/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import BrandController from './controller/brands.controller';
import { BrandsService } from './service/brands.service';
import BrandsRepository from 'src/db/repository/brands.repository';
import CatalogueController from './controller/catalogue.controller';
import CatalogueRepository from 'src/db/repository/catalogue.repository';
import { CatalogueService } from './service/catalogue.service';
import {ContactUsController } from './controller/contact.controller';
import { ContactUsService } from './service/contact.service';
import ContactUsRepository from 'src/db/repository/message.repository';
@Module({
    imports: [],
    controllers: [BrandController,CatalogueController,UserController,ContactUsController ],
    providers: [JwtService,CatalogueRepository, UserService,CatalogueService, UserRepository,BrandsService,BrandsRepository, ContactUsService,ContactUsRepository ],
})
export class ApiModule { }
