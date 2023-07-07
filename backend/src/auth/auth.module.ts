import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UsuarioModule } from '../usuario/usuario.module'; // Importa el UsuarioModule
import { UsuarioService } from '../usuario/usuario.service'; // Importa el UsuarioService

@Module({
    imports: [
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        }),
      }),
      UsuarioModule, // Agrega el UsuarioModule aquí
    ],
    providers: [AuthService, JwtStrategy], // No incluyas UsuarioService en la lista de proveedores del AuthModule
    controllers: [AuthController],
    exports: [PassportModule, AuthService],
  })
  export class AuthModule {}
  
