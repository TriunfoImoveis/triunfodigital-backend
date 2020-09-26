import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


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

  @Column({ type: 'varchar', length: 50 })
  civil_status: string;

  @Column({ type: 'integer' })
  number_children: string;

  @Column({ type: 'varchar', length: 50 })
  gender: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Client;
