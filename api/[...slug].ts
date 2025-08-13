import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { VercelRequest, VercelResponse } from '@vercel/node';

let app: INestApplication | null = null;

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.init();
  }
  
  const expressApp = app.getHttpAdapter().getInstance() as (req: VercelRequest, res: VercelResponse) => void;
  return expressApp(req, res);
}   