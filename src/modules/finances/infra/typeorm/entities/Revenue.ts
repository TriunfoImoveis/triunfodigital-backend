import { 
  Column, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryGeneratedColumn 
} from "typeorm";

import Subsidiary from "@modules/organizations/infra/typeorm/entities/Subsidiary";
import BankData from "@modules/users/infra/typeorm/entities/BankData";

export enum RevenueType {
  CRED = "CREDITO",
  DESP = "DESPACHANTE",
}

export enum RevenueStatus {
  PEND = "PENDENTE",
  VENC = "VENCIDO",
  PAGO = "PAGO",
  CANC = "CANCELADO",
}

@Entity('revenues')
class Revenue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: RevenueType })
  revenue_type: RevenueType;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'date' })
  due_date: Date;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  value_integral: number;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  tax_rate: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  invoice_value: number;

  @Column({ type: 'enum', enum: RevenueStatus, default: RevenueStatus.PEND })
  status: RevenueStatus;

  @Column({ type: 'varchar', length: 150 })
  client: string;
  
  @Column({ type: 'date', nullable: true })
  pay_date: Date;

  @ManyToOne(type => Subsidiary, {nullable: false})
  @JoinColumn({ name: 'subsidiary_id' })
  subsidiary: Subsidiary;

  @ManyToOne(type => BankData, {nullable: true})
  @JoinColumn({ name: 'bank_data_id' })
  bank_data: BankData;
}

export default Revenue;