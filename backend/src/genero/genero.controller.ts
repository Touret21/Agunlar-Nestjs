import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
import { GeneroDto } from './dto/genero.dto';
import { entidadGenero } from './entidades/genero.entity';
import { GeneroService } from './genero.service';
  
  @Controller('genero')
  export class GeneroController {
    constructor(private readonly generoService: GeneroService) {}
  
    @Get()
    getAll(): Promise<entidadGenero[]> {
      return this.generoService.getAll();
    }

    @Get(':id')
    find(@Param('id') id: number): Promise<entidadGenero> {
      return this.generoService.getId(id);
    }

    @Post()
    create(@Body() body: GeneroDto): Promise<entidadGenero> {
      return this.generoService.insert(body);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() body: GeneroDto,
    ): Promise<entidadGenero> {
      return this.generoService.update(id, body);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: number) {
      return this.generoService.delete(id);
    }
  }