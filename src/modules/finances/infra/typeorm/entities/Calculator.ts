import { 
  Column, 
  Entity, 
  JoinColumn, 
  OneToOne, 
  PrimaryGeneratedColumn 
} from "typeorm";

import Division from "./Division";
import Installment from "./Installment";

@Entity('calculations')
class Calculator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(type => Installment, installment => installment.calculation, {nullable: false})
  @JoinColumn({ name: 'installment_id' })
  installment: Installment;
  
  @Column({ type: 'varchar', length: 150, nullable: true })
  calculator_type: string;

  @Column({ type: 'decimal', precision: 14, scale: 2,  nullable: true })
  note_value: number;

  @Column({ type: 'decimal', precision: 4, scale: 2,  nullable: true })
  tax_rate: number;

  @Column({ type: 'decimal', precision: 14, scale: 2,  nullable: true })
  balance: number;

  @OneToOne(type => Division, {nullable: false, eager: true})
  @JoinColumn({ name: 'division_pl' })
  division_pl: Division;

  @OneToOne(type => Division, {nullable: false, eager: true})
  @JoinColumn({ name: 'division_lucro' })
  division_lucro: Division;

  @OneToOne(type => Division, {nullable: false, eager: true})
  @JoinColumn({ name: 'division_tax' })
  division_tax: Division;

  @OneToOne(type => Division, {nullable: true, eager: true})
  @JoinColumn({ name: 'division_other_one' })
  division_other_one: Division;

  @OneToOne(type => Division, {nullable: true, eager: true})
  @JoinColumn({ name: 'division_other_two' })
  division_other_two: Division;

  @OneToOne(type => Division, {nullable: true, eager: true})
  @JoinColumn({ name: 'division_other_three' })
  division_other_three: Division;
}

export default Calculator;