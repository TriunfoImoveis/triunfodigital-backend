import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import Subsidiary from "@modules/organizations/infra/typeorm/entities/Subsidiary";
import BankData from "@modules/users/infra/typeorm/entities/BankData";
import User from "@modules/users/infra/typeorm/entities/User";
import GroupExpense from "./GroupExpense";

export enum ExpenseType {
  FIX = "FIXA",
  VAR = "VARIAVEL",
}

export enum ExpenseStatus {
  PEND = "PENDENTE",
  VENC = "VENCIDO",
  PAGO = "PAGO",
  CANC = "CANCELADO",
}

@Entity('expenses')
class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ExpenseType })
  expense_type: ExpenseType;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'date' })
  due_date: Date;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  value: number;

  @Column({ type: 'date', nullable: true })
  pay_date: Date;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: true })
  value_paid: number;

  @Column({ type: 'enum', enum: ExpenseStatus, default: ExpenseStatus.PEND })
  status: ExpenseStatus;

  @ManyToOne(type => GroupExpense, {nullable: false})
  @JoinColumn({ name: 'group_id' })
  group: GroupExpense;

  @ManyToOne(type => Subsidiary, {nullable: false})
  @JoinColumn({ name: 'subsidiary_id' })
  subsidiary: Subsidiary;
  
  @ManyToOne(type => BankData, {nullable: true})
  @JoinColumn({ name: 'bank_data_id' })
  bank_data: BankData;

  @ManyToOne(type => User, {nullable: true})
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default Expense;