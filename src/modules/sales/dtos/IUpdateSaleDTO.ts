import User from "@modules/users/infra/typeorm/entities/User";
import Client from "@modules/sales/infra/typeorm/entities/Client";
import OriginSale from "@modules/sales/infra/typeorm/entities/OriginSale";
import Realty from "@modules/sales/infra/typeorm/entities/Realty";
import { SaleType, Status } from "@modules/sales/infra/typeorm/entities/Sale";
import PaymentType from "@modules/sales/infra/typeorm/entities/PaymentType";
import Company from "@modules/organizations/infra/typeorm/entities/Company";
import Builder from "@modules/sales/infra/typeorm/entities/Builder";

export default interface IUpdateSaleDTO {
  sale_type?: SaleType;
  sale_date?: Date;
  realty_ammount?: number;
  percentage_sale?: number;
  commission?: number;
  bonus?: number;
  origin?: OriginSale;
  payment_type?: PaymentType;
  company?: Company;
  percentage_company?: number;
  builder?: Builder;
  realty?: Realty;
  client_buyer?: Client;
  client_seller?: Client;
  user_coordinator?: User;
  users_directors?: User[];
  users_captivators?: User[];
  users_sellers?: User[];
  value_signal?: number;
  pay_date_signal?: Date;
  observation?: string;
  status?: Status; 
}
