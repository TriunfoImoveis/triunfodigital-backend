import ICreateInstallmentDTO from '@modules/sales/dtos/ICreateInstallmentDTO';
import Installment from '@modules/sales/infra/typeorm/entities/Installment';

export default interface IInstallmentRepository {
  create(instalments: ICreateInstallmentDTO[]): Promise<Installment[]>;
  delete(installments: Installment[]): Promise<void>;
}