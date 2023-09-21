import { SendMailInputDto } from './dto/sendEmail.dto';

export default interface EmailService {
  sendMail(data: SendMailInputDto): Promise<any>;
}

export const EmailServiceName = 'EmailService';
