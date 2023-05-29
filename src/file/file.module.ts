import { Module } from '@nestjs/common';
import { PuppeteerModule } from 'nest-puppeteer';
// import { PuppeteerNodeLaunchOptions } from 'puppeteer';
import { FsService } from './services/fs.service';
// import { GeneratorService } from './services/generator.service';

@Module({
  imports: [
    // PuppeteerModule.forRoot(
    //   {
    //     // headless: false,
    //     args: [
    //       '--allow-running-insecure-content',
    //       '--disable-background-networking',
    //       '--disable-default-apps',
    //       '--disable-dev-shm-usage',
    //       '--disable-extensions',
    //       '--disable-gpu',
    //       '--disable-new-tab-first-run',
    //       '--disable-notifications',
    //       '--disable-sync',
    //       '--disable-translate',
    //       '--font-render-hinting=none',
    //       '--headless',
    //       '--hide-scrollbars',
    //       '--ignore-certificate-errors',
    //       '--metrics-recording-only',
    //       '--mute-audio',
    //       '--no-default-browser-check',
    //       '--no-first-run',
    //       '--no-sandbox',
    //       '--no-startup-window',
    //       '--no-zygote',
    //       '--safebrowsing-disable-auto-update',
    //     ],
    //   } as PuppeteerNodeLaunchOptions, // optional, any Puppeteer launch options here or leave empty for good defaults */,
    // ),
  ],
  providers: [
    // GeneratorService,
    FsService,
  ],
  exports: [FsService],
})
export class FileModule {}
