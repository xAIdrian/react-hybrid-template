import { Injectable, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';

@Injectable()
@Global()
export class MongooseService {
  constructor(private readonly configService: ConfigService) {}

  async connect() {
    if (!this.configService.get('MONGODB_URI')) {
      throw new Error(
        'Add the MONGODB_URI environment variable inside .env.local to use mongoose',
      );
    }
    return mongoose
      .connect(this.configService.get('MONGODB_URI'))
      .catch((e) => console.error('Mongoose Client Error: ' + e.message));
  }
}
