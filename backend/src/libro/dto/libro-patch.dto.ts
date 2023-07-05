import { PartialType } from '@nestjs/mapped-types';
import { LibroDto } from './libro.dto';

export class LibroPatchDto extends PartialType(LibroDto) {}