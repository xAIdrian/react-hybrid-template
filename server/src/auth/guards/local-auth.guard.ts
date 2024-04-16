import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//The AuthGuard('local') is a built-in guard that uses Passport's local strategy for authentication.
//The local strategy requires a username and password to be provided in the request,
//and it uses these credentials to authenticate the user.
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
