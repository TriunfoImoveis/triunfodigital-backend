import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CivilStatus {
  C = 'CASADO(A)',
  D = 'DIVORCIADO(A)',
  S = 'SOLTEIRO(A)',
  V = 'VIUVO(A)',
}

export enum Gender {
  F = 'FEMININO',
  M = 'MASCULINO',
}

@Entity('clients')
class Client {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 80 })
  name: string;

  @Column({ type: 'varchar', length: 11, unique: true })
  cpf: string;

  @Column({ type: 'date' })
  date_birth: Date;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'varchar', length: 11 })
  phone: string;

  @Column({ type: 'varchar', length: 150 })
  occupation: string;

  @Column({ type: 'enum', enum: CivilStatus })
  civil_status: CivilStatus;

  @Column({ type: 'integer' })
  number_children: number;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Client;
