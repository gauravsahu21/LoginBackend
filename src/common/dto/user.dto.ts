import { Authorization } from "src/db/entity/authorization.entity";

export interface ILoginBody {
    userid: string;
    password: string;
}

export interface IChangePassword {
    oldPassword: string,
    newPassword: string,
    userId: string
}

export interface AddOrEditCertificate {
    certificatesId:string;
    imageId:string;
    certificateName:string;
    certificateType:string;
}