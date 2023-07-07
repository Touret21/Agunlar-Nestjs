import {
    Body,
    Controller,
    Get,
    Post
  } from '@nestjs/common';
import { UsuarioDto } from './dto/usuario.dto';
import { entidadUsuario} from './entidades/usuario.entity';
import { UsuarioService } from './usuario.service';
  
  @Controller('usuario')
  export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}
  
    @Get()
    getAll(): Promise<entidadUsuario[]> {
      return this.usuarioService.getAll();
    }
  
    @Post()
    async create(@Body() body: UsuarioDto): Promise<entidadUsuario> {
    const usuarioDto = new UsuarioDto();
    usuarioDto.username_usr = body.username_usr;
    usuarioDto.password_usr = body.password_usr;

    return this.usuarioService.insert(usuarioDto);
  }

  }