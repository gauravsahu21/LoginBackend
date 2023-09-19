/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  FileInterceptor,
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { FileUploadService } from '../service/file-upload.service';
import { SampleDto,downloadDto } from 'src/common/dto/sample.dto';
import { Express } from 'express';

@Controller('file')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('ids'))
  async upload(
    @Body() body: SampleDto,
    @UploadedFiles() ids: Array<Express.Multer.File>,
  ): Promise<any> {
    return await this.fileUploadService.uploadFile(body.type, ids);
  }

  @Post('/download')
  async download(@Body() filedata: downloadDto): Promise<any> {
    return this.fileUploadService.downloadFile(filedata);
  }

//   @Post('/delete')
//   async delete(@Body() filedata: downloadDto) {
//     return this.fileUploadService.deleteFile(filedata);
//   }
}
