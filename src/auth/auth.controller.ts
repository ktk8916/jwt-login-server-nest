import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupRequest } from './domain/request/signup.request';
import { LoginRequest } from './domain/request/login.request';
import { LoginResponse } from './domain/response/login.response';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  @HttpCode(201)
  async signup(@Body() request: SignupRequest): Promise<LoginResponse> {
    return await this.authService.signup(request);
  }

  @Post('/login')
  async login(@Body() request: LoginRequest): Promise<LoginResponse> {
    return await this.authService.login(request);
  }
}
