import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//this will be additional conditions that will be checked before the user is authenticated
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext): Promise<boolean> {
    const can = super.canActivate(context);
    if (!can) {
      throw new UnauthorizedException('Access Denied');
    }
    return can as Promise<boolean>;
  }

  handleRequest(err, user, info, context) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
