import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly s3: S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: configService.get<string>('s3.accessKeyId'),
      secretAccessKey: configService.get<string>('s3.secretAccessKey'),
      region: configService.get<string>('s3.region'),
    });
  }

  async uploadObject(filename: string, data: Buffer): Promise<void> {
    const params = {
      Bucket: 'product',
      Key: filename,
      Body: data,
    };

    await this.s3.upload(params).promise();
  }

  async getObject(filename: string): Promise<Buffer> {
    const params = {
      Bucket: this.configService.get<string>('s3.bucketName'),
      Key: filename,
    };

    const response = await this.s3.getObject(params).promise();

    return response.Body as Buffer;
  }

}


