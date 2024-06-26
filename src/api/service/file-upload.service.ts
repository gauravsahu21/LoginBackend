/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import HttpResponse from 'src/common/lib/http-response';
import FileRepository from 'src/db/repository/fileserver.repository';
import logger from '../../connections/logger/logger';

@Injectable()
export class FileUploadService {
  constructor(private fileRepo:FileRepository) {}

  async uploadFile(type: string, files:object[]) {
    try {
      const  file=await this.fileRepo.uploadandDownloadMultiplesFiles(type,files);
      console.log(file,"%%%5")
      return HttpResponse.success(
        {...file},
        'Uploaded succesfully',
        200,
      );
  
    } catch (error) {
      logger.info("Error occured in uploadFile.Service")
      logger.error(error)
      return HttpResponse.error("Error While Uploading/Downloading");
    }
  }

 
  async deleteFile(filedata) {
    try {
       const message=await this.fileRepo.deleteMultiplesFile(filedata.ids, filedata.type);
       return HttpResponse.success(
        message,
        'deleted succesfully',
        200,
      );
    } catch (error) {
      logger.info("Error occured in deleteFile.Service")
      logger.error(error)
      return HttpResponse.error("Error While Deleting");
    }
  }



}
