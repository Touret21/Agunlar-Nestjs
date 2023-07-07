import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('usuario')
export class entidadUsuario {
  @PrimaryGeneratedColumn()
  id_usr: number;

  @Column('varchar')
  username_usr: string;

  @Column('varchar')
  password_usr: string;
}