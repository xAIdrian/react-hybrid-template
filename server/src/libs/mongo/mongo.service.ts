import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';

declare global {
  // eslint-disable-next-line no-unused-vars, no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

@Injectable()
export class MongoService implements OnModuleInit {
  private client: MongoClient | undefined;
  private clientPromise: Promise<MongoClient> | undefined;

  constructor(private readonly configService: ConfigService) {
    const uri = this.configService.get<string>('MONGODB_URI');
    console.log(
      '🚀 ~ file: mongo.service.ts:17 ~ MongoService ~ constructor ~ uri:',
      uri,
    );
    const options = {};

    if (!uri) {
      console.group('🔥 MONGODB_URI missing from .env');
      console.groupEnd();
    } else if (this.configService.get('NODE_ENV') === 'development') {
      if (!global._mongoClientPromise) {
        this.client = new MongoClient(uri, options);
        global._mongoClientPromise = this.client.connect();
      }
      this.clientPromise = this.clientPromise;
    } else {
      this.client = new MongoClient(uri, options);
      this.clientPromise = this.client.connect();
    }
  }

  async onModuleInit() {}
}
