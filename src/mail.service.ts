import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from './configs/config.service';
import { SendMailDto, SendRawEmailDto } from './dtos/send-mail.dto';
import { MailSource } from './interfaces/email-service.interface';
import fs from 'fs';
import { FsService } from './file/services/fs.service';
import { Response, Request } from 'express';
import { GeneratorService } from './file/services/generator.service';

@Injectable()
export class MailService {
  private readonly SES: AWS.SES;

  private readonly logger: Logger;

  constructor(
    private readonly configService: ConfigService,
    private readonly fsService: FsService,
    private readonly generatorService: GeneratorService,
  ) {
    // Initialize the SES client
    // this.sesClient = new SES({ region: 'your-aws-region' });
    this.logger = new Logger(MailService.name);
    this.SES = new AWS.SES({
      region: this.configService.env.AWS_REGION,
      apiVersion: this.configService.env.AWS_API_VERSION,
      accessKeyId: this.configService.env.AWS_ACCESS_KEY,
      secretAccessKey: this.configService.env.AWS_SECRET_KEY,
    });
  }

  async sendMail(sendEmailPayload: SendMailDto): Promise<void> {
    try {
      // console.log({ sendEmailPayload });
      const Data = await this.generateMailTemplate();
      console.log({ Data });

      // return;
      const { MessageId } = await this.SES.sendEmail({
        Destination: {
          ToAddresses: sendEmailPayload.recipients,
        },
        Message: {
          /* required */
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data,
              // Data: sendEmailPayload.message,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: sendEmailPayload.subject,
          },
        },
        Source: `${sendEmailPayload.source}${this.configService.env.ADMIN_MAIL}` /* required */,
      }).promise();
      this.logger.log(`Email Send Successfully ===> ${MessageId}`);
    } catch (error) {
      this.logger.error(`Send Mail Failed: ${JSON.stringify(error)}`);
    }
  }

  async sendRawMail({
    attachment,
    template,
    source,
    ...sendRawEmailPayload
  }: SendRawEmailDto): Promise<void> {
    try {
      const boundary = `----=_Part${Math.random().toString().slice(2)}`;
      const rawMessage = [
        `From: ${source}`, // Can be just the email as well without <>
        `To: ${sendRawEmailPayload.recipients.join(',')}`,
        `Subject: ${template.SubjectPart}`,
        `MIME-Version: 1.0`,
        `Content-Type: multipart/mixed; boundary="${boundary}"`, // For sending both plaintext & html content
        // ... you can add more headers here as decribed in https://docs.aws.amazon.com/ses/latest/DeveloperGuide/header-fields.html
        `\n`,
        `--${boundary}`,
        `Content-Type: text/plain; charset=UTF-8`,
        `Content-Transfer-Encoding: 7bit`,
        template.TextPart,
        `\n`,
        `--${boundary}`,
        `Content-Type: text/html; charset=UTF-8`,
        `Content-Transfer-Encoding: 7bit`,
        template.HtmlPart,
        `\n`,
        `--${boundary}`,
        `Content-Type: text/plain; name="${attachment.filename}"`,
        `Content-Description: ${attachment.filename}`,
        `Content-Disposition: attachment;filename="${attachment.filename}";`,
        `Content-Transfer-Encoding: ${attachment.encoding}`,
        attachment.content,
        `\n`,
        `--${boundary}--`,
      ].join('\n');

      const params: AWS.SES.Types.SendRawEmailRequest = {
        Destinations: [...sendRawEmailPayload.recipients],
        RawMessage: {
          Data: rawMessage,
        },
        Source: source, // Must be verified within AWS SES
        // ConfigurationSetName: configuration_set, // optional AWS SES configuration set for open & click tracking
        Tags: [
          // ... optional email tags
        ],
      };

      await this.SES.sendRawEmail(params, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log(data);
        }
      });
    } catch (error) {
      this.logger.error(`Error Sending RawMail: ${JSON.stringify(error)}`);
    }
  }

  // embedTracker(): string {
  //   return `
  //     <html>
  //           <body>
  //             <img src="https://your-domain.com/tracking-image.jpg" />
  //             <p>Your email content</p>
  //           </body>
  //         </html>
  //   `;
  // }

  async generateMailTemplate() {
    const binaryImageData = await this.fsService.readFile('public/tracker.png');

    const buffer = Buffer.from(binaryImageData);
    const base64ImageData = buffer.toString('base64');
    const hostURL = 'https://22b7-102-90-44-115.ngrok-free.app';
    const imgElement = `<img src="${hostURL}/mail/metrics/tracker.png">`;
    const filePath = 'partials/layout.hbs';
    // const html = await this.generatorService.getHtml(filePath, {
    //   subtext: 'Hi subtext',
    //   //   content: `
    //   //   <html>
    //   //         <body>
    //   //           ${imgElement}
    //   //           <p>Your email content</p>
    //   //         </body>
    //   //       </html>
    //   // `,
    // });

    // console.log({ html });

    // const imgElement = `<img src="data:image/png;base64,${base64ImageData}">`;

    // console.log({ binaryImageData, base64ImageData });

    // const trackingImg = fs.readFile('../../public/tracker.png', (err, data) => {
    //   console.log({ err, data });
    // });
    return `<html>
              <body>
                ${imgElement}
                <p>Your email content</p>
              </body>
            </html>
      `;
  }

  async getMailMetric(
    req: Request,
    res: Response,
    imgName: string,
  ): Promise<any> {
    console.log('Mail Opened...', req.headers, '>>>>>>>>> Request', {
      date: new Date(),
    });
    // console.log('Read Mail Response', '>>>>>>>>> Response', res);
    return res.sendFile(imgName, { root: 'public' });
  }

  // sendImg() {}
}
