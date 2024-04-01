import { StatusInstallment } from "../infra/typeorm/entities/Installment";

export interface IListInstallmentsDTO {
  subsidiariesIds?: string[];
  status?: StatusInstallment;
  month?: string;
  year?: string;
  dateFrom?: Date;
  dateTo?: Date;
}
