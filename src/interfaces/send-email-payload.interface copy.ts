import { Template } from 'aws-sdk/clients/ses';

import { MailAttachment, MailContentTypes } from './email-service.interface';

export interface SendEmailPayload {
  subject: string;
  recipients: string[];
  message: string;
}

export interface SendRawEmailPayload extends Partial<SendEmailPayload> {
  template: Template;
  attachment: MailAttachment;
}
