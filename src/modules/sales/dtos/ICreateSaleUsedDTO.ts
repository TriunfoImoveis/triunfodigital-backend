import User from "@modules/users/infra/typeorm/entities/User";
import OriginSale from "@modules/sales/infra/typeorm/entities/OriginSale";
import Subsidiary from "@modules/organizations/infra/typeorm/entities/Subsidiary";
import Realty from "@modules/sales/infra/typeorm/entities/Realty";
import { SaleType } from "@modules/sales/infra/typeorm/entities/Sale";
import PaymentType from "@modules/sales/infra/typeorm/entities/PaymentType";

export default interface ICreateSaleUsedDTO {
  sale_type: SaleType;
  sale_date: Date;
  realty_ammount: number;
  percentage_sale: number;
  commission: number;
  bonus?: number;
  origin: OriginSale;
  payment_type: PaymentType;
  realty: Realty;
  client_buyer: string;
  client_seller: string;
  user_coordinator?: User;
  users_directors: User[];
  users_captivators: User[];
  users_sellers: User[];
  value_signal: number;
  pay_date_signal: Date;
  observation?: string;
  subsidiary: Subsidiary;
}
