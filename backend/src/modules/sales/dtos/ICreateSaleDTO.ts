import User from "@modules/users/infra/typeorm/entities/User";
import Builder from "@modules/sales/infra/typeorm/entities/Builder";
import Client from "@modules/sales/infra/typeorm/entities/Client";
import OriginSale from "@modules/sales/infra/typeorm/entities/OriginSale";
import Realty from "@modules/sales/infra/typeorm/entities/Realty";
import { SaleType } from "@modules/sales/infra/typeorm/entities/Sale";

export default interface ICreateSaleDTO {
  sale_type: SaleType;
  sale_date: Date;
  realty_ammount: number;
  percentage_sale: number;
  percentage_company: number;
  commission: number;
  details_payment?: string;
  observation?: string;
  bonus?: string;
  origin: OriginSale;
  realty: Realty;
  builder?: Builder;
  client_buyer: Client;
  client_seller?: Client;
  user_captivator: User;
  user_director: User;
  user_coordinator?: User;
  users_sellers: User[];
}
