import { 
  Column, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryGeneratedColumn 
} from "typeorm";

import DivisionType from "./DivisionType";

@Entity('divisions')
class Division {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'decimal', precision: 4, scale: 2})
  percentage: number;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  value: number;
  
  @ManyToOne(type => DivisionType, {nullable: false, eager: true, onUpdate: "CASCADE", onDelete: "RESTRICT"})
  @JoinColumn({ name: 'division_type' })
  division_type: DivisionType;
}

export default Division;