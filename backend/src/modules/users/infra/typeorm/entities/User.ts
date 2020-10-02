import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Departament from './Departament';
import Office from './Office';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar' })
  avatar: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'varchar', length: 150 })
  password: string;

  @Column({ type: 'varchar', length: 11 })
  phone: string;

  @Column({ type: 'date' })
  admission_date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  goal: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(type => Departament, users => User, {eager: true})
  @JoinColumn({name: 'departament_id'})
  departament: Departament;

  @ManyToOne(type => Office, users => User, {eager: true})
  @JoinColumn({name: 'office_id'})
  office: Office;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
