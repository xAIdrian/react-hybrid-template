import { Injectable, OnModuleInit } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { ConfigService } from '../../config/config/config.service';

@Injectable()
export class MongoService implements OnModuleInit {
  private clientPromise: Promise<MongoClient> | undefined;
  private client: MongoClient | undefined;
  private mongoClientPromise: Promise<MongoClient> | undefined;

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
      if (!this.mongoClientPromise) {
        this.client = new MongoClient(uri, options);
        this.mongoClientPromise = this.client.connect();
      }
      this.clientPromise = this.mongoClientPromise;
    } else {
      this.client = new MongoClient(uri, options);
      this.clientPromise = this.client.connect();
    }
  }

  getClientPromise() {
    return this.clientPromise;
  }
}
