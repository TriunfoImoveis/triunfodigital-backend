import { getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import ICreateInstallmentDTO from '@modules/sales/dtos/ICreateInstallmentDTO';
import IInstallmentRepository from '@modules/sales/repositories/IInstallmentRepository';
import Installment from '@modules/sales/infra/typeorm/entities/Installment';

class InstallmentRespository implements IInstallmentRepository {
  private ormRepository: Repository<Installment>;

  constructor() {
    this.ormRepository = getRepository(Installment);
  }

  async create(data: ICreateInstallmentDTO): Promise<void> {
    try {
      const installment = this.ormRepository.create(data);
      await this.ormRepository.save(installment);
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default InstallmentRespository;
