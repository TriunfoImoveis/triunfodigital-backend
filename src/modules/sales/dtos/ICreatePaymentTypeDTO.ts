import { Type } from "@modules/sales/infra/typeorm/entities/PaymentType";

export default interface ICreatePaymentTypeDTO {
  type: Type;
  name: string;
}
