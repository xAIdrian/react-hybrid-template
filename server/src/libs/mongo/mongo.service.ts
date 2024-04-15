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

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const uri = this.configService.get('MONGODB_URI');
    const options = {};

    if (!uri) {
      console.group('⚠️ MONGODB_URI missing from .env');
      console.error(
        "It's not mandatory but a database is required for Magic Links.",
      );
      console.error(
        "If you don't need it, remove the code from /libs/next-auth.js (see connectMongo())",
      );
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
}
