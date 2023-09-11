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
@Module({
    imports: [],
    controllers: [BrandController,CatalogueController,UserController],
    providers: [JwtService,CatalogueRepository, UserService,CatalogueService, UserRepository,BrandsService,BrandsRepository],
})
export class ApiModule { }
