/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from "@nestjs/common";
import { DeployService } from "../service/deploy.service";
import { WriteAccess } from "../jwt-auth.guard";

@Controller('/deploy')
export default class DeployController{
    constructor(private readonly deploy:DeployService){}

@Get('')    
@UseGuards(WriteAccess )
async saveFile(){
   return this.deploy.saveFile();
}
}