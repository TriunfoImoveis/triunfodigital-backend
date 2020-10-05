import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Entity, OneToOne
} from "typeorm";

import PropertyType from "./PropertyType";
import Sale from "./Sale";

@Entity('realties')
class Realty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  enterprise: string;

  @Column({ type: 'varchar', length: 80, nullable: false })
  unit: string;

  @Column({ type: 'varchar', length: 2, nullable: false })
  state: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 80, nullable: false })
  neighborhood: string;

  @ManyToOne(type => PropertyType, realties => Realty, {eager: true})
  @JoinColumn({name: 'property_id'})
  property: PropertyType;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(type => Sale, realty => Realty)
  sale: Sale;
}

export default Realty;
