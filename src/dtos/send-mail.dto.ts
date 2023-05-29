import {
  IsArray,
  IsAscii,
  IsEmail,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import {
  MailAttachment,
  MailSource,
} from 'src/interfaces/email-service.interface';
import { Template } from 'aws-sdk/clients/ses';
import { PartialType } from '@nestjs/mapped-types';

export class SendMailDto {
  @IsString()
  @IsNotEmpty()
  readonly subject: string;

  @IsArray()
  @IsNotEmpty()
  readonly recipients: string[];

  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @IsString()
  @IsNotEmpty()
  readonly source: MailSource = 'ETAP';
}

class AWSTemplate implements Template {
  @IsString()
  @IsNotEmpty()
  readonly TemplateName: string;

  @IsString()
  @IsNotEmpty()
  readonly SubjectPart: string;

  @IsString()
  readonly TextPart: string;

  @IsString()
  readonly HtmlPart: string;
}

export class SendRawEmailDto extends PartialType(SendMailDto) {
  @IsString()
  @IsNotEmpty()
  readonly template: AWSTemplate;

  @IsString()
  @IsNotEmpty()
  readonly attachment: MailAttachment;
}
