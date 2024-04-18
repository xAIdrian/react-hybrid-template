import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    console.log(
      '🚀 ~ file: local.strategy.ts:15 ~ LocalStrategy ~ validate ~ user:',
      user,
    );
    if (user === null) {
      console.log('User not found');
      throw new UnauthorizedException();
    }
    return user;
  }
}
