import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LibroDto } from './dto/libro.dto';
import { entidadLibro } from './entidades/libro.entity';



@Injectable()
export class LibroService {
  constructor(
    @InjectRepository(entidadLibro)
    private libroRepository: Repository<entidadLibro>,
  ) {}

  getAll(): Promise<entidadLibro[]> {
    return this.libroRepository.find({where:{estado_lbr:true}});
  }

  async getId(id: number): Promise<entidadLibro> {
    const libro = await this.libroRepository.findOne({where:{id_lbr:id}})
    if (libro) {
      return libro;
    }
    throw new NotFoundException(`No puedo encontrar ese libro`);
  }

  async insert(body: LibroDto): Promise<entidadLibro> {
    const libro = this.libroRepository.create(body);
    await this.libroRepository.save(libro);
    return libro;
  }

  async update(id: number, body: LibroDto): Promise<entidadLibro> {
    const libro = await this.libroRepository.findOne({ where: {id_lbr:id} });
    if (!libro) {
      throw new NotFoundException(
        `No se encontró el libro con el id ${id}`,
      );
    }

    Object.assign(libro, body, { id_lbr: libro.id_lbr });

    return this.libroRepository.save(libro);
  }

  async delete(id: number): Promise<entidadLibro> {
    const libro = await this.libroRepository.findOne({ where: { id_lbr: id } });
    if (!libro) {
      throw new NotFoundException(`No se encontró el libro con el id ${id}`);
    }
  
    libro.estado_lbr = false;
  
    return this.libroRepository.save(libro);
  }
}