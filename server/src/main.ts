import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:8081', // Allow only specific origins
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify HTTP methods allowed
      allowedHeaders: 'Content-Type, Accept', // Custom headers
      credentials: true, // Allow credentials
    },
  });
  await app.listen(3000);
}
bootstrap();
