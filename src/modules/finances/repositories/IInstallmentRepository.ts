import ICreateInstallmentDTO from '@modules/finances/dtos/ICreateInstallmentDTO';
import Installment from '@modules/finances/infra/typeorm/entities/Installment';
import IUpdateInstallmentDTO from '@modules/finances/dtos/IUpdateInstallmentDTO';
import IRequestInstallmentDTO from '@modules/finances/dtos/IRequestInstallmentDTO';
import IResponseInstallmentDTO from '@modules/finances/dtos/IResponseInstallmentDTO';
import { IRequestGetAmountInstallmentRecived } from '../dtos/IGetAmoutInstallmentRecived';

export default interface IInstallmentRepository {
  listFilters(data: IRequestInstallmentDTO): Promise<IResponseInstallmentDTO>;
  listAllInstallments(data: {subsidiariesIds: string[], status: string}): Promise<Installment[]>;
  findById(id: string): Promise<Installment | undefined>;
  create(instalments: ICreateInstallmentDTO[]): Promise<Installment[]>;
  delete(installments: Installment[]): Promise<void>;
  update(id: string, data: IUpdateInstallmentDTO): Promise<void>;
  updateMultipleInstallments(ids: string[], data: IUpdateInstallmentDTO): Promise<void>;
  getAmountIntallmentsRecived(data: IRequestGetAmountInstallmentRecived): Promise<Installment[]>;
  getAmountIntallmentsPay(data: IRequestGetAmountInstallmentRecived): Promise<Installment[]>;
}
