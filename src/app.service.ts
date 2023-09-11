/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getTest() {
    return 'I am Alive';
  }
}
