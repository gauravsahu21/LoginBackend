/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EditApplicants {
  @IsNotEmpty()
  @IsString()
  applicantId: string;

  @IsNotEmpty()
  @IsString()
  careerId: string;

  @IsNotEmpty()
  @IsNumber()
  applicantStatus: number;
}

export class ApplyJobDto{
  @IsNotEmpty()
  @IsString()
  applicantName :string;

  @IsNotEmpty()
  contact:any;

  @IsNotEmpty()
  experienceinfo:any;

  @IsNotEmpty()
  @IsString()
  resumeId:string;

  @IsNotEmpty()
  @IsString()
  s3Link:string;

  @IsNotEmpty()
  appliedOn:Date;

  @IsNotEmpty()
  @IsString()
  careerId:string;

  @IsNotEmpty()
  @IsNumber()
  applicantStatus: number;

}
