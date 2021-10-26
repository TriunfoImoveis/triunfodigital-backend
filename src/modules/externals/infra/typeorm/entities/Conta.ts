import { 
    Column, 
    Entity,
    PrimaryGeneratedColumn 
  } from "typeorm";
  
  export enum TipoConta {
    CC = "CORRENTE",
    CP = "POUPANCA",
    CS = "SALARIO",
  }
  
  @Entity('external_contas')
  class Conta {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', length: 150 })
    nome_banco: string;
  
    @Column({ type: 'enum', enum: TipoConta })
    tipo_conta: TipoConta;
  
    @Column({ type: 'varchar', length: 10 })
    agencia: string;
  
    @Column({ type: 'varchar', length: 10, unique: true })
    conta: string;
  }
  
  export default Conta;