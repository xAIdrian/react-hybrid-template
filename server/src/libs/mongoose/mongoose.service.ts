import { Injectable, Global } from '@nestjs/common';
import { mongodb_uri } from '../../secret_constants';
import mongoose from 'mongoose';

@Injectable()
@Global()
export class MongooseService {
  constructor() {}

  async connect() {
    if (!mongodb_uri) {
      throw new Error(
        'Add the MONGODB_URI environment variable inside .env.local to use mongoose',
      );
    }
    return mongoose
      .connect(mongodb_uri)
      .catch((e) => console.error('Mongoose Client Error: ' + e.message));
  }
}
