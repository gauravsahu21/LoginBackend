import { Module} from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { KmpDatabase } from './connections/mysql/kmp.module';

@Module({
  imports: [ApiModule, KmpDatabase, 
  ],
  controllers: [],
  providers: [],
})


export class AppModule { }
