import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validarUsuario(username: string, password: string): Promise<any> {
    this.logger.log(`Validando usuario: username=${username}, password=${password}`);

    const usuario = await this.usuarioService.getByUsername(username);

    if (usuario && compareSync(password, usuario.password_usr)) {
      const { password_usr, ...result } = usuario; // Excluye el campo de contraseña del resultado
      return result;
    }

    this.logger.log('Credenciales inválidas');
    return null;
  }

  async login(user: any): Promise<any> {
    const payload = { username: user.username_usr, sub: user.id_usr };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
