import { Injectable } from '@nestjs/common';
import User from '../../models/user.schema';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<User | undefined> {
    return User.findOne({ username: username }).exec();
  }

  async create(user: { username: string; password: string }): Promise<User> {
    //create a user object from the parameters and a created at date. then add this user to our MongoDb using the user schema
    const newUser = new User({
      username: user.username,
      password: user.password,
      createdAt: new Date(),
    });
    await newUser.save();
  }
}
