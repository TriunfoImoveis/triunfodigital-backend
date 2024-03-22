import { StatusInstallment } from "@modules/finances/infra/typeorm/entities/Installment";

export default interface IRequestInstallmentDTO {
  buyer_name?: string;
  subsidiary?: string;
  status?: StatusInstallment | StatusInstallment[];
  month?: string;
  year?: string;
  dateFrom?: Date;
  dateTo?: Date;
}
