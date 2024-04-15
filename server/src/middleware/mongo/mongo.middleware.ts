import { Injectable, NestMiddleware } from '@nestjs/common';
import { MongooseService } from 'src/libs/mongoose/mongoose.service';

@Injectable()
export class MongoMiddleware implements NestMiddleware {
  constructor(private readonly mongooseService: MongooseService) {}
  async use(req: any, res: any, next: () => void) {
    await this.mongooseService.connect();
    next();
  }
}
