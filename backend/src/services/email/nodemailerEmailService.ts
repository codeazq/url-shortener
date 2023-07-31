import { Injectable } from '@nestjs/common';
import EmailService from './emailService';
import { SendMailInputDto } from './dto/sendEmail.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export default class NodeMailerEmailService implements EmailService {
  async sendMail(data: SendMailInputDto): Promise<any> {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from:
          data.from ||
          `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
        to: data.to,
        subject: data.subject,
        text: data.text || '',
        html: data.html || '',
      });

      return info;
    } catch (error) {
      console.error(error);
    }
  }
}
