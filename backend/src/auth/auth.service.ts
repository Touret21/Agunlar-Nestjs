import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private usuarioService: UsuarioService,
  ) {}

  async login(username: string, password: string): Promise<any> {
    const user = await this.usuarioService.getByUsername(username);

    if (user.username_usr === username  && user.password_usr === password) {
      const payload = { username: user.username_usr, sub: user.id_usr };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    throw new Error('Usuario o contraseña incorrecta, ingresar nuevamente');
  }
}
