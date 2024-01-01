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
  firstName :string;

  @IsNotEmpty()
  @IsString()
  lastName :string;

  @IsNotEmpty()
  phone:any;

  @IsNotEmpty()
  email:any;

  @IsNotEmpty()
  experience:any;

}
