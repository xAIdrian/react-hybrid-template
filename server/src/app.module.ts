import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseService } from './libs/mongoose/mongoose.service';
import { MongoClient } from 'mongodb';
import { getMongoClientPromise } from './libs/mongo';
import { MongoMiddleware } from './middleware/mongo/mongo.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'MONGO_CONNECTION',
      useFactory: async (): Promise<MongoClient> => {
        const mongoClient = await getMongoClientPromise();
        if (!mongoClient) {
          throw new Error('MongoClient not initialized');
        }
        return mongoClient;
      },
    },
    AppService,
    MongooseService,
    ConfigService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MongoMiddleware).forRoutes('*');
  }
}
