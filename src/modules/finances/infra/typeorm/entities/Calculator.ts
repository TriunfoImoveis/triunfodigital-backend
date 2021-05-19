import { 
  Column, 
  Entity, 
  JoinColumn, 
  OneToMany, 
  OneToOne, 
  PrimaryGeneratedColumn 
} from "typeorm";

import Comission from "./Comission";
import Division from "./Division";
import Installment from "./Installment";

@Entity('calculations')
class Calculator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(type => Installment, installment => installment.calculation, {nullable: false})
  @JoinColumn({ name: 'installment_id' })
  installment: Installment;

  @Column({ type: 'decimal', precision: 14, scale: 2,  nullable: false })
  balance: number;
  
  @Column({ type: 'varchar', length: 150, nullable: true })
  calculator_type: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  note_number: string;

  @Column({ type: 'decimal', precision: 14, scale: 2,  nullable: true })
  note_value: number;

  @Column({ type: 'decimal', precision: 4, scale: 2,  nullable: true })
  tax_rate_nf: number;

  @Column({ type: 'decimal', precision: 4, scale: 2,  nullable: true })
  tax_iss_nf: number;

  @Column({ type: 'decimal', precision: 14, scale: 2,  nullable: true })
  value_iss: number;

  @Column({ type: 'decimal', precision: 4, scale: 2,  nullable: true })
  tax_collection: number;
  
  @OneToMany(type => Division, division => division.calculation)
  divisions: Division[];

  @OneToMany(type => Comission, comission => comission.calculation)
  participants: Comission[];
}

export default Calculator;