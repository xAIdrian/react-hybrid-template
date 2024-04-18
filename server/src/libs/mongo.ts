import { MongoClient } from 'mongodb';
import { mongodb_uri, node_env } from '../secret_constants';

// This lib is use just to connect to the database in next-auth.
// We don't use it anywhere else in the API routes—we use mongoose.js instead (to be able to use models)
// See /libs/nextauth.js file.

declare global {
  // eslint-disable-next-line no-unused-vars, no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export const getMongoClientPromise = async ():
  | Promise<MongoClient>
  | undefined => {
  const options = {};

  let client: MongoClient | undefined;
  // let clientPromise: Promise<MongoClient> | undefined;

  if (!mongodb_uri) {
    console.group('⚠️ MONGODB_URI missing from .env');
    console.error(
      "It's not mandatory but a database is required for Magic Links.",
    );
    console.error(
      "If you don't need it, remove the code from /libs/next-auth.js (see connectMongo())",
    );
    console.groupEnd();
  } else if (node_env === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(mongodb_uri, options);
      global._mongoClientPromise = client.connect();
    }
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
    return global._mongoClientPromise;
  } else {
    client = new MongoClient(mongodb_uri, options);
    return await client.connect();
  }
};
