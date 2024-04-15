import { MongoMiddleware } from './mongo.middleware';

describe('MongoMiddleware', () => {
  it('should be defined', () => {
    expect(new MongoMiddleware()).toBeDefined();
  });
});
