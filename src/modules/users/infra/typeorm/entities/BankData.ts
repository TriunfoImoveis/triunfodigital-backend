import { 
  Column, 
  Entity, 
  JoinColumn, 
  OneToOne, 
  PrimaryGeneratedColumn 
} from "typeorm";

import User from "./User";

export enum AccountType {
  CC = "CORRENTE",
  CP = "POUPANCA",
  CS = "SALARIO",
}

@Entity('bank_data')
class BankData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  bank_name: string;

  @Column({ type: 'enum', enum: AccountType })
  account_type: AccountType;

  @Column({ type: 'varchar', length: 10 })
  agency: string;

  @Column({ type: 'varchar', length: 10 })
  account: string;

  @OneToOne(type => User, user => user.bank_data, {
    nullable: false, 
    onUpdate: "CASCADE", 
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default BankData;