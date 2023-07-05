import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put
  } from '@nestjs/common';
import { LibroDto } from './dto/libro.dto';
import { entidadLibro } from './entidades/libro.entity';
import { LibroService } from './libro.service';
  
  @Controller('libro')
  export class LibroController {
    constructor(private readonly libroService: LibroService) {}
  
    @Get()
    getAll(): Promise<entidadLibro[]> {
      return this.libroService.getAll();
    }
  
    @Get(':id')
    find(@Param('id') id: number): Promise<entidadLibro> {
      return this.libroService.getId(id);
    }
  
    @Post()
    async create(@Body() body: LibroDto): Promise<entidadLibro> {
      return this.libroService.insert(body);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() body: LibroDto,
    ): Promise<entidadLibro> {
      return this.libroService.update(id, body);
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
      return this.libroService.delete(id);
    }
  }