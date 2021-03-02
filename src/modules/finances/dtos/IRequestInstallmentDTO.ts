import { StatusInstallment } from "@modules/finances/infra/typeorm/entities/Installment";

export default interface IRequestInstallmentDTO {
  buyer_name: string;
  city: string;
  status: string;
}