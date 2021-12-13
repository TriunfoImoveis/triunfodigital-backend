import GroupExpense from "@modules/finances/infra/typeorm/entities/GroupExpense";
import Subsidiary from "@modules/organizations/infra/typeorm/entities/Subsidiary";
import BankData from "@modules/users/infra/typeorm/entities/BankData";
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from "typeorm";
import Conta from "./Conta";
import Escritorio from "./Escritorio";

export enum TipoDespesa {
  E = "ENTRADA",
  S = "SAIDA",
}

@Entity('external_despesas')
class Despesa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TipoDespesa })
  tipo_despesa: TipoDespesa;

  @Column({ type: 'varchar', length: 255 })
  descricao: string;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  valor: number;

  @ManyToOne(type => GroupExpense, {nullable: true})
  @JoinColumn({ name: 'id_grupo' })
  grupo: GroupExpense;

  @Column({ type: 'date' })
  data_pagamento: Date;

  @ManyToOne(type => Subsidiary, {nullable: false})
  @JoinColumn({ name: 'id_escritorio' })
  escritorio: Subsidiary;
  
  @ManyToOne(type => BankData, {nullable: true})
  @JoinColumn({ name: 'id_conta' })
  conta: BankData;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Despesa;