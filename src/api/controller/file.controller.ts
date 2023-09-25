/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
} from '@nestjs/common';
import {
  FilesInterceptor,
} from '@nestjs/platform-express';
import { FileUploadService } from '../service/file-upload.service';
import { SampleDto,downloadDto } from 'src/common/dto/sample.dto';

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

  @Post('/delete')
  async delete(@Body() filedata: downloadDto): Promise<any> {
    return this.fileUploadService.deleteFile(filedata);
  }
}
