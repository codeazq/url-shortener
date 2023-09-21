import { Module } from '@nestjs/common';
import { EmailServiceName } from './emailService';
import NodeMailerEmailService from './nodemailerEmailService';

@Module({
  providers: [
    {
      provide: EmailServiceName,
      useClass: NodeMailerEmailService,
    },
  ],
  exports: [EmailServiceName],
})
export class EmailModule {}
