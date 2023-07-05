import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entidadLibro } from './entidades/libro.entity';
import { LibroController } from './libro.controller';
import { LibroService } from './libro.service';

@Module({
  imports:[TypeOrmModule.forFeature([entidadLibro])],
  controllers: [LibroController],
  providers: [LibroService]
})
export class LibroModule {}
