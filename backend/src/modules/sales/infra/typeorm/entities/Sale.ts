import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import Realty from "./Realty";


export enum SaleType {
  N = 'Novo',
  U = 'Usado',
}

export enum Status {
  PEN = 'Pendente',
  CON = 'Confirmado'
}

@Entity('sales')
class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: SaleType })
  sale_type: SaleType;

  @Column({ type: 'date' })
  sale_date: Date;

  @Column({ type: 'decimal', precision: 14, scale: 2})
  realty_ammount: number;

  @OneToOne(type => Realty, sale => Sale, {nullable: false})
  @JoinColumn()
  realty: Realty;

  @Column({ type: 'integer' })
  percentage_sale: number;

  @Column({ type: 'integer' })
  percentage_company: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  commission: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  details_payment: string;

  @Column({ type: 'varchar', length: 50, nullable: true})
  bonus: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  observation: string;

  @Column({ type: 'enum', enum: Status, default: Status.PEN  })
  status: Status;
}

export default Sale;
