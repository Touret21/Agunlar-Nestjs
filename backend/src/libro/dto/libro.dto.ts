import { IsBoolean, IsInt, IsString } from 'class-validator';

export class LibroDto {
  @IsString()
  titulo_lbr: string;

  @IsString()
  descripcion_lbr: string;

  @IsInt()
  genero_lbr: number;

  @IsBoolean()
  estado_lbr: boolean;
}

