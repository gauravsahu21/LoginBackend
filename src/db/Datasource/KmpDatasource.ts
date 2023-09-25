import { DataSource } from 'typeorm';
import { Authorization } from '../entity/authorization.entity';
import { BrandEntity } from '../entity/brands.entity';
import * as config from '../../config/config.json';

export const KmpDatasource = new DataSource({
  name: config.database.kmp.user,
  type: 'mysql',
  host: config.database.kmp.host,
  port: config.database.kmp.port,
  username: config.database.kmp.user,
  password: config.database.kmp.password,
  database: config.database.kmp.database,
  entities: [Authorization, BrandEntity],
  synchronize: false,
});


KmpDatasource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
