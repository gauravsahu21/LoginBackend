import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
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


export class MasterChangePassword {

  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}




