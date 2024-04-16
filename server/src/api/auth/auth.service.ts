import { Injectable } from '@nestjs/common';
import { UsersService } from '../../app/users/users.service';
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

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { username: string; password: string }) {
    //generate a random userId for me using uuidv4

    const payload = { username: user.username, sub: uuid() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
