import { getConnection, getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import ICreateInstallmentDTO from '@modules/sales/dtos/ICreateInstallmentDTO';
import IInstallmentRepository from '@modules/sales/repositories/IInstallmentRepository';
import Installment from '@modules/sales/infra/typeorm/entities/Installment';

class InstallmentRespository implements IInstallmentRepository {
  private ormRepository: Repository<Installment>;

  constructor() {
    this.ormRepository = getRepository(Installment);
  }

  async create(installments: ICreateInstallmentDTO[]): Promise<Installment[]> {
    try {
      const installmentsInstance = this.ormRepository.create(installments);
      const listInstallment = await this.ormRepository.save(installmentsInstance);
      return listInstallment;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
  
  async delete(installments: Installment[]): Promise<void> {
    try {
      installments.forEach(async (installment)=>{
        await this.ormRepository.delete(installment.id);
      });
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default InstallmentRespository;
