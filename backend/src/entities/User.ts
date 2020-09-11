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

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'varchar', length: 150 })
  password: string;

  @Column({ type: 'varchar', length: 11 })
  phone: string;

  @Column({ type: 'date' })
  admissionDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  goal: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => Departament)
  @JoinColumn({ name: 'departament_id' })
  departamentId: Departament;

  @ManyToOne(() => Office)
  @JoinColumn({ name: 'office_id' })
  officeId: Office;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default User;
