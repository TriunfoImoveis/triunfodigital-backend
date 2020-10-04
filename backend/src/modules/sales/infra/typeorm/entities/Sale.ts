import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import Builder from "./Builder";
import Client from "./Client";
import OriginSale from "./OriginSale";
import Realty from "./Realty";


export enum SaleType {
  N = 'Novo',
  U = 'Usado',
}

@Entity('sales')
class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: SaleType })
  sale_type: SaleType;

  @OneToOne(type => Realty)
  realy: Realty;

  sale_date: Date;

  builder: Builder;

  origin: OriginSale;

  client_buyer: Client;

  client_saller: Client;

  realty_ammount: number;

  percentage_sale: number;

  percentage_company: number;

  commission: number;

  details_payment: string;

  bonus: string;

  observation: string;

  status: string;
}

export default Sale;
