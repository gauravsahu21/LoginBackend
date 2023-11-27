/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards,Query } from "@nestjs/common";
import { DeployService } from "../service/deploy.service";
import { WriteAccess } from "../jwt-auth.guard";

@Controller('save/info')
export default class DeployController{
    constructor(private readonly deploy:DeployService){}

@Get('kayempee')    
@UseGuards(WriteAccess )
async saveFile(){
   return this.deploy.saveFile();
}

@Get('')    
@UseGuards(WriteAccess )
async saveBrandFile(@Query('brandId') brandId:string){
   return this.deploy.saveBrandFile(brandId);
}





}