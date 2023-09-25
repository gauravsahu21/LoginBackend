import { Body, Controller, Post, Get, Param, Patch, Query, Req, UseGuards } from "@nestjs/common";
import UserService from "../service/user.service";
import { IChangePassword, ILoginBody} from "src/common/dto/user.dto";
import { Request } from "express";
import { PasswordWriteAccess, WriteAccess } from "../jwt-auth.guard";




@Controller('')
export default class UserController {
    constructor(private readonly us: UserService) {}


    @Post('/login')
    async loginUser(@Body() body: ILoginBody): Promise<any> {
        return this.us.login(body);
    }

    @Post('/changepassword')
    @UseGuards(PasswordWriteAccess)
    async changePassword(@Body() iChangePassword:IChangePassword, @Req() req: Request) {
        return this.us.changePassword(iChangePassword);
    }

   

}