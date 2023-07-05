import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { Repository } from 'typeorm';
  import { InjectRepository } from '@nestjs/typeorm';
import { entidadGenero } from './entidades/genero.entity';
import { GeneroDto } from './dto/genero.dto';
  
  @Injectable()
  export class GeneroService {
    constructor(
      @InjectRepository(entidadGenero)
      private generoRepository: Repository<entidadGenero>,
    ) {}
  
    getAll(): Promise<entidadGenero[]> {
      return this.generoRepository.find({where:{estado_gnr:true}});
    }

    getId(id: number): Promise<entidadGenero> {
      return this.generoRepository.findOne({where:{id_gnr:id}});
    }

    async insert(body: GeneroDto): Promise<entidadGenero> {
      const generoExistente = await this.generoRepository.findOne({
        where: { nombre_gnr: body.nombre_gnr },
      });
  
      if (generoExistente) {
        throw new BadRequestException(
          `El genero '${body.nombre_gnr}' ya existe.`,
        );
      }
      const genero = this.generoRepository.create(body);
      await this.generoRepository.save(genero);
      return genero;
    }
  
    async update(id: number, body: GeneroDto): Promise<entidadGenero> {
      const genero = await this.generoRepository.findOne({ where: { id_gnr:id } });
      if (!genero) {
        throw new NotFoundException(`No he encontrado ek genero con id ${id}`);
      }
      Object.assign(genero, body, { id_gnr: genero.id_gnr });
  
      return this.generoRepository.save(genero);
    }
  
    async delete(id: number): Promise<entidadGenero> {
      const genero = await this.generoRepository.findOne({ where: { id_gnr: id } });
      if (!genero) {
        throw new NotFoundException(`No se encontró el género con el id ${id}`);
      }
    
      genero.estado_gnr = false;
    
      return this.generoRepository.save(genero);
    }
  }