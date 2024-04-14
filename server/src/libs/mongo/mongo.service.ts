import { Injectable, OnModuleInit } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class MongoService implements OnModuleInit {
  private client: MongoClient | undefined;
  private clientPromise: Promise<MongoClient> | undefined;

  async onModuleInit() {
    const uri = process.env.MONGODB_URI;
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
    } else if (process.env.NODE_ENV === 'development') {
      if (!global._mongoClientPromise) {
        this.client = new MongoClient(uri, options);
        global._mongoClientPromise = this.client.connect();
      }
      this.clientPromise = global._mongoClientPromise;
    } else {
      this.client = new MongoClient(uri, options);
      this.clientPromise = this.client.connect();
    }
  }

  getClientPromise() {
    return this.clientPromise;
  }
}
