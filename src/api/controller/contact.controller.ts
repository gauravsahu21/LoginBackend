/* eslint-disable prettier/prettier */

import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Delete,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import {
  contactUsDto,
  enquiriesDto,
  updateEnquiryDto,
} from 'src/common/dto/contact.dto';
import { ContactUsService } from '../service/contact.service';
import { PermissionsAuthGuard } from '../jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('queries')
export class ContactUsController {
  constructor(private readonly messagesService: ContactUsService) {}

  @Post('submit')
  @UseInterceptors(FilesInterceptor(''))
  composeContactUs(@Body() contactUs: contactUsDto) {
   console.log(contactUs,"&&&&&&&&&&")
    return this.messagesService.composeContactUs(contactUs);
  }


  @Get('newsubmissions')
  @UseGuards(PermissionsAuthGuard)
  getContactUs() {
    return this.messagesService.getContactUs();
  }

  @Post('submissions')
  @UseGuards(PermissionsAuthGuard)
  getAllEnquiries(@Body() enquiry: enquiriesDto) {
    return this.messagesService.getAllEnquiries(enquiry);
  }

  @Post('update')
  @UseGuards(PermissionsAuthGuard)
  updateContactUs(@Body() update: updateEnquiryDto) {
    return this.messagesService.updateContactUs(update);
  }

  @Delete('delete/:id')
  @UseGuards(PermissionsAuthGuard)
  deleteContactUs(@Param('id') id: string) {
    return this.messagesService.deleteContactUs(id);
  }
}
