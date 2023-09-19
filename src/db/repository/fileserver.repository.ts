/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import {

    Injectable
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export default class FileRepository {
    
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

    async download(id: string, type: string) {
        try {
            const s3 = new AWS.S3({
                endpoint: `https://eu2.contabostorage.com/${type}`,
                accessKeyId: '1bf047b8d69dfd0122f4961b30d36c57',
                secretAccessKey: '6a88813879c0124e05b11c056fd781e8',
                s3BucketEndpoint: true,
                signatureVersion: 'v4'
            });
            return new Promise((resolve, reject) => {
                s3.headObject({ Bucket: type, Key: id }, async (err, data) => {
                    if (err && err.code === 'NotFound') {
                        console.log(`Object with key '${id}' does not exist in the bucket.`);
                        resolve("not found");
                    } else if (err) {
                        console.error('Error:', err);
                        reject("error while");
                    } else {
                        const params = {
                            Bucket: 'product',
                            Key: id,
                            Expires: 36000, // Link expiration time in seconds (e.g., 1 hour)
                        };
                        const url = await s3.getSignedUrlPromise('getObject', params);
                        resolve(url);
                    }
                });
            });
            //  s3.headObject({Bucket:type,Key:id}, function (err, data) {
            //     if (err && err.code === 'NotFound') {

            //       console.log(`Object with key '${id}' does not exist in the bucket.`);
            //       return "A";
            //     } else if (err) {
            //       console.error('Error:', err);
            //       return "B";
            //     } else {
            //       console.log(`Object with key '${id}' exists in the bucket.`);
            //       return "C";
            //     }
            //   });
            // const params = {
            //     Bucket:'product',
            //     Key:id,
            //     Expires: 36000, // Link expiration time in seconds (e.g., 1 hour)
            //   };
            //   const url = await s3.getSignedUrlPromise('getObject', params);

            //   return url;
        } catch (error) {
            console.log(error, "qq")
            throw error;
        }
    }

    async downloadFile(ids: string[], type: string) {
        try {
            let download_data = {};
            for (let id of ids) {
                const url = await this.download(id, type);
                if (url == undefined || url === 'not found') {
                    download_data[id] = 'no such file found';
                } else {
                    download_data[id] = url;
                }
            }
            return download_data;
        } catch (err) {
            throw err;
        }
    }
}
