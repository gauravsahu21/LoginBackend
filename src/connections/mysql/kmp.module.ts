import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authorization } from 'src/db/entity/authorization.entity';
import * as config from '../../config/config.json'

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: config.database.kmp.host,
        port: config.database.kmp.port,
        username: config.database.kmp.user,
        password: config.database.kmp.password,
        database: config.database.kmp.database,
        synchronize: false,
        entities: [Authorization],

    }),]
})
export class KmpDatabase { }