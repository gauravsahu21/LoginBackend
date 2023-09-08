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