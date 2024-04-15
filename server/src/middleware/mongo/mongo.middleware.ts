import { Injectable, NestMiddleware } from '@nestjs/common';
import connectMongo from 'src/libs/mongoose';

@Injectable()
export class MongoMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    await connectMongo();
    next();
  }
}
