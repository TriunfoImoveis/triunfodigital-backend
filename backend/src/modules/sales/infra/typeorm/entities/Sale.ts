import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import User from "../../../../users/infra/typeorm/entities/User";
import Builder from "./Builder";
import Client from "./Client";
import OriginSale from "./OriginSale";
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

  @Column({ type: 'enum', enum: SaleType, nullable: false })
  sale_type: SaleType;

  @Column({ type: 'date', nullable: false })
  sale_date: Date;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: false})
  realty_ammount: number;

  @Column({ type: 'integer', nullable: false })
  percentage_sale: number;

  @Column({ type: 'integer', nullable: false })
  percentage_company: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false})
  commission: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  details_payment: string;

  @Column({ type: 'varchar', length: 50, nullable: true})
  bonus: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  observation: string;

  @Column({ type: 'enum', enum: Status, default: Status.PEN  })
  status: Status;

  @ManyToOne(type => OriginSale, sales => Sale, {nullable: false, eager: true})
  @JoinColumn({ name: 'origin_id' })
  origin: OriginSale;

  @OneToOne(type => Realty, sale => Sale, {nullable: false, eager: true})
  @JoinColumn({ name: 'realty_id' })
  realty: Realty;

  @ManyToOne(type => Builder, sales => Sale, {nullable: true, eager: true})
  @JoinColumn({ name: 'builder_id' })
  builder: Builder;

  @OneToOne(type => Client, { nullable: false })
  @JoinColumn({ name: 'client_buyer' })
  client_buyer: Client;

  @OneToOne(type => Client, { nullable: true })
  @JoinColumn({ name: 'client_saller' })
  client_saller: Client;

  @OneToOne(type => User, {nullable: false})
  @JoinColumn({ name: 'user_captivator' })
  user_captivator: User;

  @OneToOne(type => User, {nullable: false})
  @JoinColumn({ name: 'user_director' })
  user_director: User;

  @OneToOne(type => User, {nullable: true})
  @JoinColumn({ name: 'user_coordinator' })
  user_coordinator: User;

  @ManyToMany(type => User)
  @JoinTable({ name: 'sale_has_sallers' })
  sale_has_sallers: User;
}

export default Sale;
