import { Injectable } from '@nestjs/common';
import { UsersService } from '../app/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';

//Our AuthService has the job of retrieving a user and verifying the password.
//We create a validateUser() method for this purpose.
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (user && password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signup(user: { username: string; password: string }): Promise<{
    username: string;
    password: string;
    createdAt: string;
    access_token: string;
  }> {
    const createdUser = await this.usersService.create(user);
    return {
      ...createdUser,
      access_token: this.jwtService.sign({
        username: user.username,
        sub: uuid(),
      }),
    };
  }

  async login(user: { username: string; password: string }) {
    const payload = { username: user.username, sub: uuid() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
