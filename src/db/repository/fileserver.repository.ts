/* eslint-disable prettier/prettier */
import {
    
    Injectable
  } from '@nestjs/common';
  import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
  
  @Injectable()
  export default class FileRepository {
    private s3: AWS.S3;

    constructor() {
        this.s3 = new AWS.S3({
          endpoint: 'https://eu2.contabostorage.com/product',
          accessKeyId: '1bf047b8d69dfd0122f4961b30d36c57',
          secretAccessKey: '6a88813879c0124e05b11c056fd781e8',
          s3BucketEndpoint: true,
        });
      }
    
    async uploadFiles(type: string, files: object[]){
        try{
        files.map(async(file)=>{

            await this.s3
            .putObject({
              Bucket: 'product',
              Key:file['originalname'],
              Body:file['buffer'],
            })
            .promise();
        })
            // await this.s3
            // .putObject({
            //   Bucket: 'product',
            //   Key:files[0]['originalname'],
            //   Body:files[0]['buffer'],
            // })
            // .promise();

    //  console.log("yes");
    //         const k=await this.s3.listObjects({
    //             Bucket:'product',
    //         }, function (err, data) {
    //             if (err) {
    //                 console.log("err")
    //               console.log(err)
    //             return err;
    //             } else {
    //                 // Return the list ("Contents") as JSON
    //                 console.log("ww")
    //                 console.log(data.Contents)
    //             }
    //         })
    //     console.log(k)
    //           return "yes"

        }catch(err){
   console.log("gaurav");
        }
    }
  }
  