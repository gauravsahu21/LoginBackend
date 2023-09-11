import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ILoginBody {
  @IsNotEmpty()
  @IsString()
  userid: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class IChangePassword {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class AddOrEditCertificate {
  @IsNotEmpty()
  @IsString()
  certificatesId: string;

  @IsNotEmpty()
  @IsString()
  imageId: string;

  @IsNotEmpty()
  @IsString()
  certificateName: string;

  @IsNotEmpty()
  @IsString()
  certificateType: string;
}
