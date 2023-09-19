/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import HttpResponse from 'src/common/lib/http-response';
import FileRepository from 'src/db/repository/fileserver.repository';
import { downloadDto } from 'src/common/dto/sample.dto';

@Injectable()
export class FileUploadService {
  constructor(private fileRepo:FileRepository) {}

  async uploadFile(type: string, files:object[]) {
    try {
      const  file=await this.fileRepo.uploadFiles(type,files);
      console.log(file,"!!!")
      return HttpResponse.success(
        {...file},
        'Uploaded succesfully',
        200,
      );
  
    } catch (error) {
      return HttpResponse.error(error.message);
    }
  }

  async downloadFile(filedata:downloadDto) {
    try {
      const download = await this.fileRepo.downloadFile(
        filedata.ids,
        filedata.type,
      );
      // return HttpResponse.success(
      //   {...download},
      //   'downloaded succesfully',
      //   200,
      // );
    } catch (error) {
      return HttpResponse.error(error.message);
    }
  }
  async deleteFile(filedata:downloadDto) {
    try {
      //  const message=await this.minioClientService.deleteMultiplesFile(filedata.ids, filedata.type);
      //  return HttpResponse.success(
      //   message,
      //   'deleted succesfully',
      //   200,
      // );
    } catch (error) {
  
      return HttpResponse.error(error.message);
    }
  }
}
