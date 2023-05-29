import { readFile } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';

import { Injectable, Logger } from '@nestjs/common';
import * as handlebars from 'handlebars';
import { InjectBrowser } from 'nest-puppeteer';
// import { Browser, PDFOptions, PaperFormat, Viewport } from 'puppeteer';

// interface FileGeneratePayload {
//   type: 'png' | 'pdf';
//   html: string;
//   format?: PaperFormat;
//   paperOptions?: { width: number; height: number };
//   viewPortOptions?: Viewport;
// }

const ReadFile = promisify(readFile);

@Injectable()
export class GeneratorService {
  protected url = '';

  private readonly logger: Logger;

  constructor() {
    // @InjectBrowser() private readonly browser: Browser
    this.logger = new Logger(GeneratorService.name);
  }

  async getHtml(filePath: string, context: any): Promise<string> {
    this.logger.log(`Generating html...`);
    const mailsTemplate = `./src/views/${filePath}`;

    const templatePath = resolve(mailsTemplate);
    const content = await ReadFile(templatePath);

    handlebars.registerHelper('ifeq', function (a, b, options) {
      if (a == b) {
        return options.fn(this);
      }
      return options.inverse(this);
    });

    // compile and render the template with handlebars
    const template = handlebars.compile(content.toString());

    return template(context);
  }

  // async generate(payload: FileGeneratePayload): Promise<Buffer> {
  //   const {
  //     html,
  //     paperOptions,
  //     viewPortOptions,
  //     format = 'a4',
  //     type,
  //   } = payload;
  //   this.logger.log(`Generating file...`);

  //   const page = await this.browser.newPage();
  //   await page.setViewport({
  //     width: viewPortOptions?.width || 800,
  //     height: viewPortOptions?.height || 800,
  //     deviceScaleFactor: viewPortOptions?.deviceScaleFactor || 2,
  //   });

  //   await page.setContent(html, {
  //     waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
  //   });

  //   await page.emulateMediaType('screen');
  //   const options: PDFOptions = { printBackground: true };
  //   if (paperOptions) {
  //     options.width = paperOptions?.width;
  //     options.height = paperOptions?.height;
  //     Object.assign(options, paperOptions);
  //   } else {
  //     options.format = format;
  //   }
  //   let buffer;
  //   if (type === 'pdf') {
  //     buffer = await page.pdf(options);
  //   } else {
  //     const content = await page.$('body');
  //     buffer = await content.screenshot({ omitBackground: true });
  //   }

  //   return buffer;
  // }
}
