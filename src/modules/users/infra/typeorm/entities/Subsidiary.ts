import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';

import Departament from './Departament';
import User from './User';

@Entity('subsidiaries')
class Subsidiary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  goal: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  country: string;

  @OneToMany(type => Departament, subsidiary => Subsidiary)
  departaments: Departament[];

  @OneToMany(type => User, subsidiary => Subsidiary)
  users: User[];

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Subsidiary;
