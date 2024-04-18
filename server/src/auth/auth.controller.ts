import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Body() body: { username: string; password: string },
  ) {
    const payload = this.authService.login(body);
    console.log(
      '🚀 ~ file: auth.controller.ts:24 ~ AuthController ~ payload:',
      payload,
    );
    return payload;
  }

  @Post('signup')
  async signup(@Body() body: { username: string; password: string }): Promise<{
    username: string;
    createdAt: string;
    access_token: string;
  }> {
    return this.authService.signup(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
