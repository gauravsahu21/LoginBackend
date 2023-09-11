/* eslint-disable prettier/prettier */

import { Controller, Post, UseGuards, Body, Get, Delete, Param} from "@nestjs/common";
import { contactUsDto, enquiriesDto, updateEnquiryDto } from "src/common/dto/contact.dto";
import { ContactUsService } from "../service/contact.service";

@Controller('contactus')
export class ContactUsController {
    constructor(private readonly messagesService: ContactUsService) { }

    @Post('submit')
    composeContactUs(@Body() contactUs: contactUsDto) {
        return this.messagesService.composeContactUs(contactUs);
    }

    @Get('newsubmissions')
    getContactUs() {
        return this.messagesService.getContactUs();
    }

    @Post('getall/submissions')
    getAllEnquiries(@Body() enquiry:enquiriesDto) {
       return this.messagesService.getAllEnquiries(enquiry);
    }
   

    @Post('update')
    updateContactUs(@Body() update: updateEnquiryDto) {
      return this.messagesService.updateContactUs(update);
    }

   @Delete('delete/:id')
   deleteContactUs(@Param('id') id: string){
    return this.messagesService.deleteContactUs(id)
   }


}
