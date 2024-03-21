import { Brackets, getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import ICreateInstallmentDTO from '@modules/finances/dtos/ICreateInstallmentDTO';
import IInstallmentRepository from '@modules/finances/repositories/IInstallmentRepository';
import Installment from '@modules/finances/infra/typeorm/entities/Installment';
import IUpdateInstallmentDTO from '@modules/finances/dtos/IUpdateInstallmentDTO';
import IRequestInstallmentDTO from '@modules/finances/dtos/IRequestInstallmentDTO';

class InstallmentRespository implements IInstallmentRepository {
  private ormRepository: Repository<Installment>;

  constructor() {
    this.ormRepository = getRepository(Installment);
  }

  async listFilters(data: IRequestInstallmentDTO): Promise<Installment[]> {
    try {
      console.log({data});
      const {buyer_name, subsidiary, status} = data;
      const listInstallments = await this.ormRepository.createQueryBuilder("i")
        .select()
        .innerJoinAndSelect("i.sale", "sale")
        .innerJoinAndSelect("sale.client_buyer", "buyer")
        .leftJoinAndSelect("sale.client_seller", "seller")
        .innerJoinAndSelect("sale.realty", "realty")
        .leftJoinAndSelect("sale.builder", "builder")
        .innerJoinAndSelect("sale.sale_has_sellers", "sellers")
        .innerJoinAndSelect("sale.subsidiary", "subsidiary")
        .leftJoinAndSelect("i.calculation", "calculation")
        .leftJoinAndSelect("calculation.divisions", "divisions")
        .leftJoinAndSelect("divisions.division_type", "division_type")
        .leftJoinAndSelect("calculation.participants", "participants")
        .leftJoinAndSelect("calculation.bank_data", "bank_data")
        .where(new Brackets(qb => {
          if (subsidiary) {
            qb.andWhere("subsidiary.id = :subsidiary", {subsidiary})
          }
          if (status) {
            qb.andWhere("i.status IN (:...status)", {status: status})
          }
          if (buyer_name) {
            qb.andWhere("buyer.name ILIKE :buyer_name", {buyer_name: buyer_name+"%"})
          }
        }))
        .andWhere("sale.status IN (:...status_sale)", {status_sale: ["PENDENTE", "PAGO_TOTAL", "CAIU"]})
        .orderBy("due_date", "DESC")
        .getMany();

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
        relations: ['sale', 'sale.builder']
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
