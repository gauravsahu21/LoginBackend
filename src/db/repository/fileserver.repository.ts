/* eslint-disable prettier/prettier */
import {

    Injectable
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export default class FileRepository {
    // private s3: AWS.S3;

    // constructor() {
    //     this.s3 = new AWS.S3({
    //       endpoint: 'https://eu2.contabostorage.com/product',
    //       accessKeyId: '1bf047b8d69dfd0122f4961b30d36c57',
    //       secretAccessKey: '6a88813879c0124e05b11c056fd781e8',
    //       s3BucketEndpoint: true,
    //     });
    //   }

    async uploadFiles(type: string, files: object[]) {
        try {
            const uploadresponse = {};
            const s3 = new AWS.S3({
                endpoint: `https://eu2.contabostorage.com/${type}`,
                accessKeyId: '1bf047b8d69dfd0122f4961b30d36c57',
                secretAccessKey: '6a88813879c0124e05b11c056fd781e8',
                s3BucketEndpoint: true,
            });
            files.map(async (file, i) => {

                const ext = file['originalname'].substring(
                    file['originalname'].lastIndexOf('.'),
                    file['originalname'].length,
                );

                const fileName: string = uuidv4() + ext;
                const uploadStatus = await s3
                    .putObject({
                        Bucket: type,
                        Key: fileName,
                        Body: file['buffer'],
                        // ContentType:'video/quicktime'
                    })
                    .promise();
                if (uploadStatus) {
                    console.log("gaurav")
                    uploadresponse[i + 1] = {
                        filename: file['originalname'],
                        fileId: fileName,
                        mimetype: file['mimetype'],
                        size: file['size'],
                    };
                }
                console.log(uploadresponse, "!@")
            })

            return uploadresponse;
        } catch (err) {
            console.log("gaurav");
        }
    }
   async createConnection(type:string){
    const s3 = new AWS.S3({
        endpoint: `https://eu2.contabostorage.com/${type}`,
        accessKeyId: '1bf047b8d69dfd0122f4961b30d36c57',
        secretAccessKey: '6a88813879c0124e05b11c056fd781e8',
        s3BucketEndpoint: true,
    });
    return s3;
   }
    async downloadFile(ids: string[], type: string) {
        try {
            const s3 = new AWS.S3({
                endpoint: 'https://eu2.contabostorage.com/product',
                accessKeyId: '1bf047b8d69dfd0122f4961b30d36c57',
                secretAccessKey: '6a88813879c0124e05b11c056fd781e8',
                s3BucketEndpoint: true,
                signatureVersion: 'v4'
            });
            const params = {
                Bucket:'product',
                Key:'provisional1.jpeg',
                Expires: 36000, // Link expiration time in seconds (e.g., 1 hour)
              };
              
              const url = await s3.getSignedUrlPromise('getObject', params);
              
              console.log('Download URL:', url);
        } catch (error) {
          throw error;
        }
      }
}
