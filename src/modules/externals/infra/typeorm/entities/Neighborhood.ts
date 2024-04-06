import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity('neighborhoods')
@Index(['name'])
@Index(['city'])
@Index(['uf'])
class Neighborhood {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;
  @Column({ type: 'varchar', length: 250, nullable: false })
  city: string;
  @Column({ type: 'varchar', length: 2, nullable: false })
  uf: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Neighborhood;
