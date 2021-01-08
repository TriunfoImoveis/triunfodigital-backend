import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import User from "@modules/users/infra/typeorm/entities/User";
import Company from "@modules/organizations/infra/typeorm/entities/Company";
import Builder from "./Builder";
import Client from "./Client";
import Installment from "./Installment";
import Motive from "./Motive";
import OriginSale from "./OriginSale";
import PaymentType from "./PaymentType";
import Realty from "./Realty";


export enum SaleType {
  N = 'NOVO',
  U = 'USADO',
}

export enum Status {
  NV  = 'NAO_VALIDADO',
  CA  = 'CAIU',
  PE  = 'PENDENTE',
  PT  = 'PAGO TOTAL',
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

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false})
  commission: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true})
  bonus: number;

  @Column({ type: 'enum', enum: Status, default: Status.NV })
  status: Status;

  @Column({ type: 'varchar', length: 150, nullable: true })
  another_motive: string;

  @ManyToOne(type => Motive, {nullable: true})
  @JoinColumn({ name: 'motive_id' })
  motive: Motive;

  @ManyToOne(type => OriginSale, sales => Sale, {nullable: false})
  @JoinColumn({ name: 'origin_id' })
  origin: OriginSale;

  @ManyToOne(type => Company, {nullable: true})
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  percentage_company: number;

  @ManyToOne(type => PaymentType, {nullable: false})
  @JoinColumn({ name: 'payment_type' })
  payment_type: PaymentType;

  @OneToOne(type => Realty, sale => Sale, {nullable: false})
  @JoinColumn({ name: 'realty_id' })
  realty: Realty;

  @ManyToOne(type => Builder, sales => Sale, {nullable: true})
  @JoinColumn({ name: 'builder_id' })
  builder: Builder;

  @ManyToOne(type => Client, {nullable: false})
  @JoinColumn({ name: 'client_buyer' })
  client_buyer: Client;

  @ManyToOne(type => Client, {nullable: true})
  @JoinColumn({ name: 'client_seller' })
  client_seller: Client;

  @ManyToMany(type => User)
  @JoinTable({
    name: 'sale_has_directors',
    joinColumn: {
      name: "sale_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "user_id",
        referencedColumnName: "id"
    }
  })
  users_directors: User[];

  @ManyToOne(type => User, {nullable: true})
  @JoinColumn({ name: 'user_coordinator' })
  user_coordinator: User;

  @ManyToMany(type => User)
  @JoinTable({
    name: 'sale_has_captivators',
    joinColumn: {
      name: "sale_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "user_id",
        referencedColumnName: "id"
    }
  })
  sale_has_captivators: User[];

  @ManyToMany(type => User, sale_has_seller => sale_has_seller.sales)
  @JoinTable({
    name: 'sale_has_sellers',
    joinColumn: {
      name: "sale_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "user_id",
        referencedColumnName: "id"
    }
  })
  sale_has_sellers: User[];

  @OneToMany(type => Installment, installment => installment.sale)
  installments: Installment[];
}

export default Sale;
