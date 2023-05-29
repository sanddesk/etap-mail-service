import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { config } from 'dotenv';

type NODE_ENV = 'development' | 'production' | 'test';
type TYPEORM_TYPE = 'auto' | 'sqlite' | 'postgres';

export class EnvConfig {
  @IsIn(['development', 'production', 'test'])
  NODE_ENV: NODE_ENV;

  @IsNumber()
  PORT: number;

  @IsString()
  ADMIN_MAIL: string;

  @IsIn(['auto', 'sqlite', 'postgres'])
  TYPEORM_TYPE: TYPEORM_TYPE;

  @IsString()
  TYPEORM_HOST: string;

  @IsString()
  TYPEORM_USERNAME: string;

  @IsString()
  TYPEORM_PASSWORD: string;

  @IsString()
  TYPEORM_DATABASE: string;

  @IsNumber()
  TYPEORM_PORT: number;

  @IsBoolean()
  TYPEORM_LOGGING: boolean;

  @IsString()
  AWS_REGION: string;

  @IsString()
  AWS_API_VERSION: string;

  @IsString()
  AWS_ACCESS_KEY: string;

  @IsString()
  AWS_SECRET_KEY: string;

  @IsNumber()
  HEALTH_CHECK_DATABASE_TIMEOUT_MS: number;

  @IsString()
  JWT_SECRET: string;

  @IsNumber()
  JWT_EXPIRES_IN: number;

  static getDefaultObject(): EnvConfig {
    const obj = new EnvConfig();
    obj.NODE_ENV = 'development';
    obj.PORT = 3000;
    obj.ADMIN_MAIL = '<admin@etapinsure.com>';
    obj.TYPEORM_TYPE = 'auto';
    obj.TYPEORM_HOST = process.env.TYPEORM_HOST || 'localhost';
    obj.TYPEORM_USERNAME = process.env.TYPEORM_USERNAME || 'postgres';
    obj.TYPEORM_PASSWORD = process.env.TYPEORM_PASSWORD || 'postgres';
    obj.TYPEORM_DATABASE =
      process.env.TYPEORM_DATABASE || 'etap_mailing_service';
    obj.TYPEORM_PORT = 5432;
    obj.TYPEORM_LOGGING = true;
    obj.AWS_REGION = process.env.AWS_REGION || 'us-west-2';
    obj.AWS_API_VERSION = process.env.AWS_API_VERSION || '2010-12-01';
    obj.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY || '';
    obj.AWS_SECRET_KEY = process.env.AWS_SECRET_KEY || '';
    obj.HEALTH_CHECK_DATABASE_TIMEOUT_MS = 3000;
    obj.JWT_SECRET = '';
    obj.JWT_EXPIRES_IN = 86400;
    return obj;
  }
}

config();
