import { StatusInstallment } from "../infra/typeorm/entities/Installment";

export default interface IUpdateInstallmentDTO {
  pay_date?: Date;
  status: StatusInstallment;
}