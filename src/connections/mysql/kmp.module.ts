/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authorization } from 'src/db/entity/authorization.entity';
import * as config from '../../config/config.json';
import { Certificate } from 'src/db/entity/certificates.entity';

import { BrandEntity } from 'src/db/entity/brands.entity';
import { CatalogueEntity } from 'src/db/entity/catalogue.entity';
import { ContactUsEntity } from 'src/db/entity/contactus.entity';
import { CareerEntity } from 'src/db/entity/careers.entity';
import { VideoEntity } from 'src/db/entity/videos.entity';
import { Applicant } from 'src/db/entity/applicants.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.database.kmp.host,
      port: config.database.kmp.port,
      username: config.database.kmp.user,
      password: config.database.kmp.password,
      database: config.database.kmp.database,
      synchronize: false,
      entities: [
        Applicant,
        Authorization,
        Certificate,
        BrandEntity,
        CatalogueEntity,
        ContactUsEntity,
        CareerEntity,
        VideoEntity,
      ],
    }),
  ],
})
export class KmpDatabase {}
