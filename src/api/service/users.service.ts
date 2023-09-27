/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Brand } from 'src/common/dto/brands.dto';
import { UserDto } from 'src/common/dto/users.dto';
import HttpResponse from 'src/common/lib/http-response';
import UsersRepository from 'src/db/repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async getUsers() {
    try {
      const list = await this.usersRepository.getUsers();
      return HttpResponse.success(
        list,
        'Users Data Fetched succesfully',
        200,
      );
    } catch (error) {
      return HttpResponse.error(error.message);
    }
  }
  async addUpdateUser(body: UserDto) {
    try {
      const response = await this.usersRepository.addUpdateUser(body);
      if(response){
      return HttpResponse.success(null, 'Users Data Updated succesfully', 200);
    }
    else{
      return HttpResponse.error("Something Went wrong");
    }
    } catch (error) {
      return HttpResponse.error(error.message);
    }
  }
  async deleteUser(profileId: string) {
    try {
      const response = await this.usersRepository.deleteUser(profileId);
      if(response){
      return HttpResponse.success(null, 'User Deleted succesfully', 200);}
      else{
        return HttpResponse.error("Something Went wrong");
      
      }
    } catch (error) {
      return HttpResponse.error(error.message);
    }
  }
}
