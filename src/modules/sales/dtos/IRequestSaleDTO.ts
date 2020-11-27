import { Status } from "@modules/sales/infra/typeorm/entities/Sale";

export default interface IRequestSaleDTO {
  name: string;
  city: string;
  status: string;
}
