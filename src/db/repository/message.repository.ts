/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Between, In } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { createConnectionAndChannel } from 'src/connections/connection';
import {
  contactUsDto,
  enquiriesDto,
  updateEnquiryDto,
} from 'src/common/dto/contact.dto';
import { ContactUsEntity } from '../entity/contactus.entity';
import logger from '../../connections/logger/logger';


@Injectable()
export default class ContactUsRepository {
  private channel: any;
  async insertDataType(type: string, email: string) {
    try {
      const newContactUs = new ContactUsEntity();
      newContactUs.contactUsId = uuidv4();
      newContactUs.contactUsType = "0";
      newContactUs.message ="";
      newContactUs.countryCode = "";
      newContactUs.contactNumber ="";
      newContactUs.email = email;
      newContactUs.connectorName ="";
      newContactUs.contactSubject = { "brandId": "", "brandName": "Kayempee", "categoryId": "", "categoryName": "Kayempee" };
      newContactUs.contactTime = new Date();
      newContactUs.connectStatus = 0;
      newContactUs.additionalNotes ="";
      newContactUs.contactType=type;
      await ContactUsEntity.save(newContactUs);
    } catch (err) {
      logger.info("Error occured in insertData.Repo")
      logger.error(err)
      throw err;
    }
  }


  async insertData(contactUs: contactUsDto) {
    try {
    
      const newContactUs = new ContactUsEntity();
      newContactUs.contactUsId = uuidv4();
      newContactUs.contactUsType = "0";
      newContactUs.message = contactUs.messages;
      newContactUs.countryCode = "";
      newContactUs.contactNumber = contactUs.phone;
      newContactUs.email = contactUs.email;
      newContactUs.connectorName = `${contactUs.firstName} ${contactUs.lastName}`;
      newContactUs.contactSubject = { "brandId": "", "brandName": "Kayempee", "categoryId": "", "categoryName": "Kayempee" };
      newContactUs.contactTime = new Date();
      newContactUs.connectStatus = 0;
      newContactUs.additionalNotes = contactUs.messages;
      await ContactUsEntity.save(newContactUs);
    } catch (err) {
      logger.info("Error occured in insertData.Repo")
      logger.error(err)
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
            logger.info("Error occured in composeContactUs.Repo")
            logger.error(error)
            console.error('Error processing contact us form:', error);
          }
        });
      }

      return totalNewContactUsForm;
    } catch (error) {
      logger.info("Error occured ingetContactUs.Repo")
      logger.error(error)
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

      const contactusPerPage = 20;
      const { toDate, fromDate, connectStatus, page, type } = enquiries;
      if (type.includes("ALL") && type.length === 1) {
        type.push(...["1", "2", "0"]);
      }
      let response;
      let totalPages;
      if (toDate === null && fromDate === null) {
        const totalconnectUs = await ContactUsEntity.count({
          where: {
            connectStatus: In(connectStatus),
            contactUsType: In([...type]),
          },
        });
        console.log(totalconnectUs, "asd")
        totalPages = Math.ceil(totalconnectUs / contactusPerPage);
        response = await ContactUsEntity.find({
          where: {
            connectStatus: In(connectStatus),
            contactUsType: In([...type]),
          },
          take: contactusPerPage,
          skip: (page - 1) * contactusPerPage,
        });

      } else if (toDate === null && fromDate != null) {
        console.log('toDate null');
        const date = this.getDate();
        response = await ContactUsEntity.find({
          where: {
            connectStatus: In(connectStatus),
            contactTime: Between(fromDate, date),
            contactUsType: In([...type]),
          },

          take: contactusPerPage,
          skip: (page - 1) * contactusPerPage,
        });

        const totalconnectUs = await ContactUsEntity.count({
          where: {
            connectStatus: In(connectStatus),
            contactTime: Between(fromDate, date),
            contactUsType: In([...type]),
          },
        });

        totalPages = Math.ceil(totalconnectUs / contactusPerPage);
      } else if (toDate != null && fromDate === null) {
        console.log('fromDate null');
        const date = this.getOneMonthPreviousDate();
        console.log(date, '@');
        response = await ContactUsEntity.find({
          where: {
            connectStatus: In(connectStatus),
            contactTime: Between(date, toDate),
            contactUsType: In([...type]),
          },

          take: contactusPerPage,
          skip: (page - 1) * contactusPerPage,
        });
        const totalconnectUs = await ContactUsEntity.count({
          where: {
            connectStatus: In(connectStatus),
            contactTime: Between(date, toDate),
            contactUsType: In([...type]),
          },
        });

        totalPages = Math.ceil(totalconnectUs / contactusPerPage);
      } else {
        console.log('nothing null');
        response = await ContactUsEntity.find({
          where: {
            connectStatus: In(connectStatus),
            contactTime: Between(fromDate, toDate),
            contactUsType: In([...type]),
          },

          take: contactusPerPage,
          skip: (page - 1) * contactusPerPage,
        });

        const totalconnectUs = await ContactUsEntity.count({
          where: {
            connectStatus: In(connectStatus),
            contactTime: Between(fromDate, toDate),
            contactUsType: In([...type]),
          },
        });

        totalPages = Math.ceil(totalconnectUs / contactusPerPage);
      }

      return {
        response,
        totalPages,
      };
    } catch (error) {
      logger.info("Error occured in getAllEnquiries.Repo")
      logger.error(error)
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
      logger.info("Error occured in  updateContactUs.Repo")
      logger.error(error)
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
      logger.info("Error occured in  deleteContactUs.Repo")
      logger.error(error)
      throw error;
    }
  }
}
