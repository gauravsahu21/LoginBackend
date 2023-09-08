import { Body, Controller, Post, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import UserService from "../service/user.service";
import { IChangePassword, ILoginBody} from "src/common/dto/user.dto";
import { Request } from "express";



@Controller('')
export default class UserController {
    constructor(private readonly us: UserService) { }


    @Post('/login')
    async loginUser(@Body() body: ILoginBody): Promise<any> {
        console.log("login called")
        return this.us.login(body);
    }

    @Post('/changepassword')
    @UseGuards()
    async changePassword(@Body() iChangePassword:IChangePassword, @Req() req: Request) {
        return this.us.changePassword(iChangePassword);
    }


}