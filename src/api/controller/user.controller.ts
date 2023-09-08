import { Body, Controller, Post, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import UserService from "../service/user.service";
import { IChangePassword, ICreateUserBody, IImpersonateLoginBody, ILoginBody, ILoginResponse, ISuccessResponse } from "src/common/dto/user.dto";
import RabbitMQService from "../../common/rabbitmq/rabbitmq.service";
import HttpResponse from "src/common/lib/http-response";
import { Request } from "express";
import { WriteAccess } from "../jwt-auth.guard";



@Controller('')
export default class UserController {
    constructor(private readonly us: UserService) { }


    @Post('/login')
    async loginUser(@Body() body: ILoginBody): Promise<any> {
        console.log("login called")
        return this.us.login(body);
    }

    @Post('/password/forgot')
    async forgotPassword(@Body('userid') userid: string, @Req() req: Request) {
        return this.us.forgotPassword(userid, req);
    }

    @Post('/changepassword')
    @UseGuards(WriteAccess)
    async changePassword(@Body() iChangePassword:IChangePassword, @Req() req: Request) {
        return this.us.changePassword(iChangePassword);
    }

}