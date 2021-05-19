import { 
  Column, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryGeneratedColumn 
} from "typeorm";

import Calculator from "./Calculator";
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

  @ManyToOne(type => Calculator, division => division.divisions, {nullable: false, onUpdate: "CASCADE", onDelete: "CASCADE"})
  @JoinColumn({ name: 'calculation_id' })
  calculation: Calculator;
}

export default Division;