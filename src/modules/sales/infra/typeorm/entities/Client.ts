import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Profession from './Professions';

export enum CivilStatus {
  C = 'CASADO(A)',
  D = 'DIVORCIADO(A)',
  S = 'SOLTEIRO(A)',
  V = 'VIUVO(A)',
}

export enum Gender {
  F = 'FEMININO',
  M = 'MASCULINO',
  O = 'OUTRO',
}

@Entity('clients')
class Client {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 80 })
  name: string;

  @Column({ type: 'varchar', length: 11, unique: true, nullable: true })
  cpf: string;

  @Column({ type: 'varchar', length: 14, unique: true, nullable: true })
  cnpj: string;

  @Column({ type: 'date', nullable: true })
  date_birth: Date;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'varchar', length: 11, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 14, nullable: true })
  whatsapp: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  occupation: string;

  @ManyToOne(() => Profession)
  @JoinColumn({ name: 'profession_id' })
  profession: Profession;

  @Column()
  profession_id: string;

  @Column({ type: 'enum', enum: CivilStatus, nullable: true })
  civil_status: CivilStatus;

  @Column({ type: 'integer', nullable: true })
  number_children: number;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ type: 'varchar', length: 200, nullable: true })
  address: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Client;

