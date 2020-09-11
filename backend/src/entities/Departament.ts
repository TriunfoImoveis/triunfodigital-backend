import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Subsidiary from './Subsidiary';

@Entity('departaments')
class Departament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  initials: string;

  @ManyToOne(() => Subsidiary)
  @JoinColumn({ name: 'subsidiary_id' })
  subsidiaryId: Subsidiary;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  goal: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Departament;
