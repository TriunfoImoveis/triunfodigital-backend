import Installment from "@modules/finances/infra/typeorm/entities/Installment";

export default interface IResponseInstallmentDTO {
  installments: Installment[];
  totalInstallments: number;
  amountInstallmentRecived?: number;
  amountInstallmentPay?: number;
}
