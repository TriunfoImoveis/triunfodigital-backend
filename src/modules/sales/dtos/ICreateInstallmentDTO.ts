import Sale from "@modules/sales/infra/typeorm/entities/Sale";

export default interface ICreateInstallmentDTO {
  sale: Sale;
  installment_number: number;
  value: number;
  due_date: Date;
}
