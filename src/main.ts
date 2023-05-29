import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MailModule } from './mail.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';

async function bootstrap() {
  const logger = new Logger('ETAP Mailing Service');
  const app = await NestFactory.create<NestExpressApplication>(MailModule);
  const resolvedPath = resolve('public/');

  // this line serves static files
  app.useStaticAssets(resolvedPath);
  const PORT = +process.env.PORT || 3000;
  await app.listen(PORT);

  logger.log(`***** Mail Server running on ${PORT}`);
}
bootstrap();
