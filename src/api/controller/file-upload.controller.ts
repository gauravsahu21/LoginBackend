import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { S3Service} from './../service/s3.service';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: S3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) 
  async uploadFile(@UploadedFile() file) {
    console.log(file,"dasdsdadasds")
    var buf = new Buffer([10, 20, 30, 40, 50]);
    return await this.fileUploadService.uploadObject(file,buf);
  }
}