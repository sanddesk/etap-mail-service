import { Module } from '@nestjs/common';
import { ConfigService } from './configs/config.service';
// import { FileGenerataorModule } from './file-generator/file-generataor.module';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { FileModule } from './file/file.module';
import { GeneratorService } from './file/services/generator.service';

@Module({
  imports: [
    // FileGenerataorModule
    FileModule,
  ],
  controllers: [MailController],
  providers: [MailService, ConfigService, GeneratorService],
})
export class MailModule {}
