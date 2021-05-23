import { getRepository, Repository } from 'typeorm';

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
      const {buyer_name, city, status} = data;
      const listInstallments = await this.ormRepository.createQueryBuilder("i")
        .select()
        .innerJoinAndSelect("i.sale", "sale")
        .innerJoinAndSelect("sale.client_buyer", "buyer")
        .innerJoinAndSelect("sale.realty", "realty")
        .innerJoinAndSelect("sale.sale_has_sellers", "sellers")
        .innerJoinAndSelect("sellers.subsidiary", "subsidiary")
        .leftJoinAndSelect("i.calculation", "calculation")
        .leftJoinAndSelect("calculation.divisions", "divisions")
        .leftJoinAndSelect("divisions.division_type", "division_type")
        .where("subsidiary.city ILIKE :city", {city: city+"%"})
        .andWhere("i.status IN (:...status)", {status: status})
        .andWhere("buyer.name ILIKE :buyer_name", {buyer_name: buyer_name+"%"})
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
