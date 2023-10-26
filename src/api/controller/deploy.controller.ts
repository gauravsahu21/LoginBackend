/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from "@nestjs/common";
import { DeployService } from "../service/deploy.service";
import { PermissionsAuthGuard } from "../jwt-auth.guard";

@Controller('/deploy')
export default class DeployController{
    constructor(private readonly deploy:DeployService){}

@Get('')    
@UseGuards(PermissionsAuthGuard)
async saveFile(){
    console.log("yes!!");
   return this.deploy.saveFile();
}
}