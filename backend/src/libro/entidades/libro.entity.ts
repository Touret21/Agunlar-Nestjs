
import { entidadGenero } from 'src/genero/entidades/genero.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('libro')
export class entidadLibro {
  @PrimaryGeneratedColumn()
  id_lbr: number;

  @Column('varchar', { length: 50 })
  titulo_lbr: string;

  @Column('text')
  descripcion_lbr: string;

  @Column('int')
  genero_lbr: number;

  @Column('boolean')
  estado_lbr:boolean;

  @ManyToOne(() => entidadGenero, (genero) => genero.libro)
  genero: entidadGenero;
}