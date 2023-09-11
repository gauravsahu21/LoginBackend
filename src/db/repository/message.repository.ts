/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Between } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { createConnectionAndChannel } from 'src/connections/connection';
import {
  contactUsDto,
  enquiriesDto,
  updateEnquiryDto,
} from 'src/common/dto/contact.dto';
import { ContactUsEntity } from '../entity/contactus.entity';

@Injectable()
export default class ContactUsRepository {
  private channel: any;

  async composeContactUs(contactus: contactUsDto) {
    this.channel = await createConnectionAndChannel();
    try {
      if (this.channel) {
        const contactusform = Buffer.from(JSON.stringify(contactus));
        this.channel.sendToQueue('contactus', contactusform);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async insertData(contactUs: contactUsDto) {
    try {
      const newContactUs = new ContactUsEntity();
      newContactUs.contactUsId = uuidv4();
      newContactUs.contactUsType = contactUs.contactUsType;
      newContactUs.message = contactUs.message;
      newContactUs.countryCode = contactUs.countryCode;
      newContactUs.contactNumber = contactUs.contactNumber;
      newContactUs.email = contactUs.email;
      newContactUs.connectorName = contactUs.connectorName;
      newContactUs.contactSubject = contactUs.contactSubject;
      newContactUs.contactTime = contactUs.contactTime;
      newContactUs.connectStatus = contactUs.connectStatus;
      newContactUs.additionalNotes = contactUs.additionalNotes;
      await ContactUsEntity.save(newContactUs);
    } catch (err) {
      throw err;
    }
  }
  async getContactUs() {
    this.channel = await createConnectionAndChannel();
    try {
      const totalNewContactUsForm = [];
      if (this.channel) {
        await this.channel.consume('contactus', async (contact) => {
          try {
            const messageObj = JSON.parse(contact.content.toString());
            totalNewContactUsForm.push(messageObj);
            this.insertData(messageObj);
            this.channel.ack(contact);
          } catch (error) {
            console.error('Error processing contact us form:', error);
          }
        });
      }

      return totalNewContactUsForm;
    } catch (error) {
      console.log(error, 'asd');
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  getDate() {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newdate = year + '-' + month + '-' + day;
    return newdate;
  }
  getOneMonthPreviousDate() {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() - 2; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newdate = year + '-' + month + '-' + day;
    return newdate;
  }

  async getAllEnquiries(enquiries: enquiriesDto) {
    try {
      const { toDate, fromDate, connectStatus, page } = enquiries;
      let response;
      let totalPages;
      if (toDate === null && fromDate === null) {
        console.log('both null');
        const totalconnectUs = await ContactUsEntity.count({
          where: {
            connectStatus: connectStatus,
          },
        });

        totalPages = Math.ceil(totalconnectUs / 8);
        response = await ContactUsEntity.find({
          where: {
            connectStatus: connectStatus,
          },
          take: 8,
          skip: (page - 1) * 8,
        });
      } else if (toDate === null && fromDate != null) {
        console.log('toDate null');
        const date = this.getDate();
        response = await ContactUsEntity.find({
          where: {
            connectStatus: connectStatus,
            contactTime: Between(fromDate, date),
          },

          take: 8,
          skip: (page - 1) * 8,
        });

        const totalconnectUs = await ContactUsEntity.count({
          where: {
            connectStatus: connectStatus,
            contactTime: Between(fromDate, date),
          },
        });

        totalPages = Math.ceil(totalconnectUs / 8);
      } else if (toDate != null && fromDate === null) {
        console.log('fromDate null');
        const date = this.getOneMonthPreviousDate();
        console.log(date, '@');
        response = await ContactUsEntity.find({
          where: {
            connectStatus: connectStatus,
            contactTime: Between(date, toDate),
          },

          take: 8,
          skip: (page - 1) * 8,
        });
        const totalconnectUs = await ContactUsEntity.count({
          where: {
            connectStatus: connectStatus,
            contactTime: Between(date, toDate),
          },
        });

        totalPages = Math.ceil(totalconnectUs / 8);
      } else {
        console.log('nothing null');
        response = await ContactUsEntity.find({
          where: {
            connectStatus: connectStatus,
            contactTime: Between(fromDate, toDate),
          },

          take: 8,
          skip: (page - 1) * 8,
        });

        const totalconnectUs = await ContactUsEntity.count({
          where: {
            connectStatus: connectStatus,
            contactTime: Between(fromDate, toDate),
          },
        });

        totalPages = Math.ceil(totalconnectUs / 8);
      }

      return {
        response,
        totalPages,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateContactUs(update: updateEnquiryDto) {
    try {
      const updateContact = await ContactUsEntity.createQueryBuilder('contact')
        .update()
        .set({ connectStatus: update.connectStatus }) // Use set to specify the column to update and its new value
        .where('contactUsId = :contactUsId', {
          contactUsId: update.contactUsId,
        }) // Use where to specify the condition
        .execute();
      return updateContact;
    } catch (error) {
      throw error;
    }
  }

  async deleteContactUs(deleteId: string) {
    try {
      console.log(deleteId, 'asd');
      const deleteStatus = await ContactUsEntity.createQueryBuilder('contact')
        .delete()
        .where('contactUsId = :contactUsId', { contactUsId: deleteId })
        .execute();
      return deleteStatus;
    } catch (error) {
      throw error;
    }
  }
}
