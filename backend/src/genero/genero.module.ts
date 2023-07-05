import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entidadGenero } from './entidades/genero.entity';
import { GeneroController } from './genero.controller';
import { GeneroService } from './genero.service';

@Module({
  imports: [TypeOrmModule.forFeature([entidadGenero])],
  controllers: [GeneroController],
  providers: [GeneroService]
})
export class GeneroModule {}
