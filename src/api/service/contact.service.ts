/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { contactUsDto, enquiriesDto, updateEnquiryDto } from "src/common/dto/contact.dto";
import HttpResponse from "src/common/lib/http-response";
import ContactUsRepository from "src/db/repository/message.repository";
@Injectable()
export class ContactUsService {
    constructor(private readonly contactusRepo: ContactUsRepository) { }
    async composeContactUs(contactus: contactUsDto) {
        try {
            await this.contactusRepo.composeContactUs(contactus);
            return HttpResponse.success(
                'Contactus form submitted successfully',
            );
        } catch (error) {
            return HttpResponse.error(error.message);
        }
    }

    async getContactUs() {
        try {
            const totalNewContactUsForm = await this.contactusRepo.getContactUs();
            return HttpResponse.success(totalNewContactUsForm, "Fetched New ContactUs Submission Form Successfully", 200);
        } catch (error) {
            return HttpResponse.error(error.message);
        }
    }

    async getAllEnquiries(enquiry: enquiriesDto) {
        try {
            const enquiries = await this.contactusRepo.getAllEnquiries(enquiry);
            return HttpResponse.success(enquiries, "Fetched ContactUs Submission Forms Successfully", 200);
        } catch (error) {
            return HttpResponse.error(error.message);
        }
    }

    async updateContactUs(update: updateEnquiryDto) {
        try {
           const updateContact= await this.contactusRepo.updateContactUs(update);
           if (updateContact.affected === 0) {
            return HttpResponse.success(
                `ContactusId ${update.contactUsId} is not found`
            );
        }
            return HttpResponse.success(
                'Contactus form Updated successfully',
            );
        } catch (error) {
            return HttpResponse.error(error.message);
        }
    }

    async deleteContactUs(deleteId: string) {
        try {
            const deleteStatus = await this.contactusRepo.deleteContactUs(deleteId);
            console.log(deleteStatus)
            if (deleteStatus.affected === 0) {
                return HttpResponse.success(
                    `ContactusId ${deleteId} is not found`
                );
            }
            return HttpResponse.success(
                `ContactusId ${deleteId} deleted successfully`
            );
        } catch (error) {
            return HttpResponse.error(error.message);
        }
    }
}