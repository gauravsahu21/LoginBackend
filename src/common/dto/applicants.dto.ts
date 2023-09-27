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
