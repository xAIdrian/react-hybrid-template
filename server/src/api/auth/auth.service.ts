import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../app/users/users.service';
import { JwtService } from '@nestjs/jwt';

//Our AuthService has the job of retrieving a user and verifying the password.
//We create a validateUser() method for this purpose.
@Injectable()
export class AuthService {
  private readonly users = [
    { userId: 1, email: 'test@example.com', password: 'changeme' },
  ];
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = this.users.find(
      (user) => user.email === email && user.password === password,
    );
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
