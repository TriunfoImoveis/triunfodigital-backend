import ICreateInstallmentDTO from '@modules/sales/dtos/ICreateInstallmentDTO';
import Installment, { StatusInstallment } from '@modules/sales/infra/typeorm/entities/Installment';
import IUpdateInstallmentDTO from '@modules/sales/dtos/IUpdateInstallmentDTO';

export default interface IInstallmentRepository {
  create(instalments: ICreateInstallmentDTO[]): Promise<Installment[]>;
  createFirstInstallment(instalment: ICreateInstallmentDTO): Promise<void>;
  delete(installments: Installment[]): Promise<void>;
  findById(id: string): Promise<Installment | undefined>;
  update(id: string, data: IUpdateInstallmentDTO): Promise<void>;
}