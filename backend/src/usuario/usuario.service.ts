import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioDto } from './dto/usuario.dto';
import { entidadUsuario } from './entidades/usuario.entity';



@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(entidadUsuario)
    private usuarioRepository: Repository<entidadUsuario>,
  ) {}

  getAll(): Promise<entidadUsuario[]> {
    return this.usuarioRepository.find();
  }

  async getByUsername(username: string): Promise<entidadUsuario | undefined> {
    return this.usuarioRepository.findOne({ where: { username_usr: username } });
  }

  async insert(body: UsuarioDto): Promise<entidadUsuario> {
  const usuario = this.usuarioRepository.create(body);
  await this.usuarioRepository.save(usuario);
  return usuario;
}

  async update(id: number, body: UsuarioDto): Promise<entidadUsuario> {
    const usuario = await this.usuarioRepository.findOne({ where: {id_usr:id} });
    if (!usuario) {
      throw new NotFoundException(
        `No se encontró el usuario con el id ${id}`,
      );
    }

    Object.assign(usuario, body, { id_lbr: usuario.id_usr });

    return this.usuarioRepository.save(usuario);
  }
}