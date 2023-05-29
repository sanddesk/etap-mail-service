import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SendRawEmailDto, SendMailDto } from './dtos/send-mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('health')
  health(): any {
    return {
      status: 'Ok',
    };
  }

  @Put('send')
  sendMail(@Body() payload: SendMailDto): void {
    this.mailService.sendMail(payload);
  }

  @Put('send-raw')
  sendRawMail(@Body() payload: SendRawEmailDto): void {
    this.mailService.sendRawMail(payload);
  }

  @Get('metrics/:imgName')
  getMailMetric(
    @Param('imgName') imgName: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // Send the image file as the response
    return this.mailService.getMailMetric(req, res, imgName);
  }
}
