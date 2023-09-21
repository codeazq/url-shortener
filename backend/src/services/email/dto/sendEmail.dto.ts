export class SendMailInputDto {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}
