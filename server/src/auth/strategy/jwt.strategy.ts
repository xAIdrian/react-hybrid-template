import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../../secret_constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  //For the jwt-strategy, Passport first verifies the JWT's signature and decodes the JSON.
  //It then invokes our validate() method passing the decoded JSON as its single parameter.
  //It's also worth pointing out that this approach leaves us room ('hooks' as it were)
  //to inject other business logic into the process. For example, we could do a database
  //lookup in our validate() method to extract more information about the user,
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
