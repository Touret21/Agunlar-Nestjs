import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body('username') username: string): Promise<any> {
    const token = await this.authService.login(username);

    if (!token) {
      return { message: 'Credenciales inválidas' };
    }

    return token;
  }
}
