import {IsString } from 'class-validator';

export class UsuarioDto {
  @IsString()
  username_usr: string;

  @IsString()
  password_usr: string;
}

