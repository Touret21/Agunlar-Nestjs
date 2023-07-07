import { IsBoolean, IsString } from 'class-validator';

export class LibroDto {
  @IsString()
  titulo_lbr: string;

  @IsString()
  descripcion_lbr: string;

  @IsString()
  genero_lbr: string;

  @IsBoolean()
  estado_lbr: boolean;
}

