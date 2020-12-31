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
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      const installmentsInstance = this.ormRepository.create(installments);
      const listInstallment = await queryRunner.manager.save(installmentsInstance);

      await queryRunner.commitTransaction();

      return listInstallment;

    } catch (err) {

      await queryRunner.rollbackTransaction();
      throw new AppError(err);

    } finally {
      await queryRunner.release();
    }
  }
  
  // createInstance(data: ICreateInstallmentDTO): Installment {
  //   try {
  //     const installment = this.ormRepository.create(data);
  //     return installment;
  //   } catch (err) {
  //     throw new AppError(err.detail);
  //   }
  // }
}

export default InstallmentRespository;
