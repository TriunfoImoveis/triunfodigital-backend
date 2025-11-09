import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index
} from 'typeorm';

import Client from '@modules/sales/infra/typeorm/entities/Client';

@Entity('professions')
class Profession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Index({ unique: true })
  @Column()
  normalized_name: string;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Client, client => client.profession)
  clients: Client[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Profession;
