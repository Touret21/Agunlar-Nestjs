

import {
  Column,
  Entity,
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

  @Column('varchar', { length: 50 })
  genero_lbr: string;

  @Column('boolean')
  estado_lbr:boolean;

}