import User from "@modules/users/infra/typeorm/entities/User";
import Builder from "@modules/sales/infra/typeorm/entities/Builder";
import Client from "@modules/sales/infra/typeorm/entities/Client";
import OriginSale from "@modules/sales/infra/typeorm/entities/OriginSale";
import Realty from "@modules/sales/infra/typeorm/entities/Realty";
import { SaleType } from "@modules/sales/infra/typeorm/entities/Sale";
import PaymentType from "@modules/sales/infra/typeorm/entities/PaymentType";
import Company from "@modules/organizations/infra/typeorm/entities/Company";

export default interface ICreateSaleNewDTO {
  sale_type: SaleType;
  sale_date: Date;
  realty_ammount: number;
  percentage_sale: number;
  company?: Company;
  percentage_company?: number;
  commission: number;
  bonus?: number;
  origin: OriginSale;
  payment_type: PaymentType;
  realty: Realty;
  builder: Builder;
  client_buyer: Client;
  user_coordinator?: User;
  users_directors: User[];
  users_sellers: User[];
}
