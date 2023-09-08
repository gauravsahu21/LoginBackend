import { Authorization } from "src/db/entity/authorization.entity";

export interface ILoginBody {
    userid: string;
    password: string;
    rememberme?: boolean;
}

export interface IChangePassword {
    oldPassword: string,
    newPassword: string,
    userId: string
}

export interface ICreateUserBody {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ILoginResponse {
    user: Authorization;
    accessToken: string;
    success: boolean;
}

export interface ISuccessResponse {
    success: boolean;
}
export interface IImpersonateLoginBody {
    userid: string;
    impersonateLoginId: string;
    password: string;
}