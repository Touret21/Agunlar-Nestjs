import { entidadLibro } from 'src/libro/entidades/libro.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('genero')
export class entidadGenero {
  @PrimaryGeneratedColumn()
  id_gnr: number;

  @Column({ unique: true, type: 'varchar', length: 50 })
  nombre_gnr: string;

  @Column('boolean')
  estado_gnr:boolean;

  @OneToMany(() => entidadLibro, (libro) => libro.genero)
  @JoinColumn()
  libro: entidadLibro[];
}