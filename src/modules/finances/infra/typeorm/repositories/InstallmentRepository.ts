import { getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import ICreateInstallmentDTO from '@modules/finances/dtos/ICreateInstallmentDTO';
import IInstallmentRepository from '@modules/finances/repositories/IInstallmentRepository';
import Installment from '@modules/finances/infra/typeorm/entities/Installment';
import IUpdateInstallmentDTO from '@modules/finances/dtos/IUpdateInstallmentDTO';

class InstallmentRespository implements IInstallmentRepository {
  private ormRepository: Repository<Installment>;

  constructor() {
    this.ormRepository = getRepository(Installment);
  }

  async list(): Promise<Installment[]> {
    try {
      const listInstallments = await this.ormRepository.find({
        cache: true
      });

      return listInstallments;
    } catch (err) {
      throw new AppError(err.detail);
    }
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

  async findById(id: string): Promise<Installment | undefined> {
    try {
      const installment = await this.ormRepository.findOne(id, {
        relations: ['sale']
      });
      return installment;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async update(id: string, data: IUpdateInstallmentDTO): Promise<void> {
    try {
      await this.ormRepository.update(id, data);
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default InstallmentRespository;
