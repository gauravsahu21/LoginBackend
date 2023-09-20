/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { error } from 'console';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export default class FileRepository {

    async uploadAndDownload( fileName: string, bucket: string,buffer:any) {
        try {
            const s3 = new AWS.S3({
                endpoint: `${process.env.CONTABO_OBJECT_STORAGE_ENDPOINT}${bucket}`,
                accessKeyId:`${process.env.CONTABO_OBJECT_STORAGE_accessKeyId}`,
                secretAccessKey:`${process.env.CONTABO_OBJECT_STORAGE_secretAccessKey}`,
                s3BucketEndpoint: true,
                signatureVersion: 'v4',
            });

            return new Promise((resolve, reject) => {
                s3.putObject({ Bucket:bucket, Key: fileName,Body:buffer}, async (err, data) => {
                    if (err ) {
                        resolve('not uploaded');
                    } else if (err) {
                        reject(err);
                    } else {
                        console.log(data)
                        // const params = {
                        //     Bucket:bucket,
                        //     Key:fileName,
                        //     Expires: 36000,
                        // };
                        
                        const url =`${process.env.CONTABO_OBJECT_STORAGE_accessLink}:${bucket}/${fileName}`
        
                        resolve(url);
                    }
                });
            });
        } catch (error) {
            throw error;
        }
    }

    async uploadandDownloadMultiplesFiles(type: string, files: object[]) {
        try {
            console.log("saurav");
            const uploadresponse = {};
            console.log(`${process.env.CONTABO_OBJECT_STORAGE_ENDPOINT}${type}`,`${process.env.CONTABO_OBJECT_STORAGE_accessKeyId}`,`${process.env.CONTABO_OBJECT_STORAGE_secretAccessKey}`)
            for (let file of files) {
                const ext = file['originalname'].substring(
                    file['originalname'].lastIndexOf('.'),
                    file['originalname'].length,
                );

                const fileName: string = uuidv4() + ext;
             const url=await this.uploadAndDownload(fileName,type,file['buffer'])
            console.log(url,"URL");

             if (url == undefined || url == 'not uploaded') {
                
                uploadresponse[file['originalname']] = {
                    fileId: fileName,
                    s3Link:"Not Uploaded",
                    mimetype: file['mimetype'],
                    size: file['size'],
                };
            } else {
                
                uploadresponse[file['originalname']] = {
                    fileId: fileName,
                    s3Link:url,
                    mimetype: file['mimetype'],
                    size: file['size'],
                };
            }
            

            }

            return uploadresponse;
        } catch (err) {
            throw err;
        }
    }

    async deleteFilefromServer(type, id) {
        try {

            const s3 = new AWS.S3({
                endpoint: `${process.env.CONTABO_OBJECT_STORAGE_ENDPOINT}${type}`,
                accessKeyId:`${process.env.CONTABO_OBJECT_STORAGE_accessKeyId}`,
                secretAccessKey:`${process.env.CONTABO_OBJECT_STORAGE_secretAccessKey}`,
                s3BucketEndpoint: true,
                signatureVersion: 'v4',
            });
            return new Promise((resolve, reject) => {
                s3.headObject({ Bucket: type, Key: id }, async (err, data) => {
                    if (err && err.code === 'NotFound') {
                        console.log(
                            `Object with key '${id}' does not exist in the bucket.`,
                        );
                        resolve('not found');
                    } else if (err) {
                        console.error('Error:', err);
                        reject('not found');
                    } else {
                        const params = {
                            Bucket: 'product',
                            Key: id,
                        };
                        s3.deleteObject(params, (err, data) => {
                            if (err) {
                                error(err);
                            } else {
                                resolve('deleted successfully');
                            }
                        });
                    }
                });
            });
        } catch (err) {
            throw err;
        }
    }

    async deleteMultiplesFile(ids: string[], type: string) {
        try {
            let delete_data = {};
            for (let id of ids) {
                const delete_response = await this.deleteFilefromServer(
                    type,
                    id,
                );

                if (delete_response == undefined || delete_response == 'not found') {
                    delete_data[id] = 'no such file found';
                } else {
                    delete_data[id] = delete_response;
                }
            }
            return { ids: delete_data };
        } catch (err) {
            throw err;
        }
    }
}
