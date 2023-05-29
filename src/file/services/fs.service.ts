import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { readFile } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';

const ReadFile = promisify(readFile);

@Injectable()
export class FsService {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(FsService.name);
  }

  readFile(filePath: string): Promise<string> {
    const resolvedPath = resolve(filePath);
    // return Promise.resolve(resolvedPath);
    return new Promise((resolve, reject) => {
      fs.readFile(resolvedPath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}
