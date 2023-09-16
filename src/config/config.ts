import { registerAs } from '@nestjs/config';

export default registerAs('s3', () => ({
  accessKeyId: process.env.CONTABO_OBJECT_STORAGE_ACCESS_KEY,
  secretAccessKey: process.env.CONTABO_OBJECT_STORAGE_SECRET_KEY,
  region: 'European Union (Germany)',
  bucketName: 'your_bucket_name', // Replace with your bucket name
}));