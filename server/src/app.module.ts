import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoService } from './libs/mongo/mongo.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { MongooseService } from './libs/mongoose/mongoose.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, MongoService, MongooseService, ConfigService],
})
export class AppModule {}
