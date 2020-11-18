import { Status } from "@modules/sales/infra/typeorm/entities/Sale";

export default interface IValidSaleDTO {
  status: Status;
}
