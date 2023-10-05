import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddOrEditCertificate {
  @IsOptional()
  @IsString()
  certificatesId: string;

  @IsString()
  imageId: string;
  
  @IsString()
  s3link: string;

  @IsNotEmpty()
  @IsString()
  certificateName: string;

  @IsNotEmpty()
  @IsString()
  certificateType: string;

  @IsString()
  logoImageId: string;
  
  @IsString()
  logoS3link: string;
}
