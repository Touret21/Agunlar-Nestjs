import { IsBoolean, IsString } from 'class-validator';


export class GeneroDto {
  @IsString()
  nombre_gnr: string;

  @IsBoolean()
  estado_gnr:boolean;
}