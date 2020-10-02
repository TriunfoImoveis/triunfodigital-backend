import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import Departament from './Departament';

@Entity('subsidiaries')
class Subsidiary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  goal: number;

  @OneToMany(type => Departament, subsidiary => Subsidiary)
  departaments: Departament[];

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Subsidiary;
