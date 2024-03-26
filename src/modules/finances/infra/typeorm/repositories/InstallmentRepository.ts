import { Brackets, getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import ICreateInstallmentDTO from '@modules/finances/dtos/ICreateInstallmentDTO';
import IInstallmentRepository from '@modules/finances/repositories/IInstallmentRepository';
import Installment, { StatusInstallment } from '@modules/finances/infra/typeorm/entities/Installment';
import IUpdateInstallmentDTO from '@modules/finances/dtos/IUpdateInstallmentDTO';
import IRequestInstallmentDTO from '@modules/finances/dtos/IRequestInstallmentDTO';
import IResponseInstallmentDTO from '@modules/finances/dtos/IResponseInstallmentDTO';
import { IRequestGetAmountInstallmentRecived } from '@modules/finances/dtos/IGetAmoutInstallmentRecived';
import { Status } from '@modules/sales/infra/typeorm/entities/Sale';

class InstallmentRespository implements IInstallmentRepository {
  private ormRepository: Repository<Installment>;

  constructor() {
    this.ormRepository = getRepository(Installment);
  }



  async listFilters(data: IRequestInstallmentDTO): Promise<IResponseInstallmentDTO> {
    try {
      const {
        buyer_name,
        subsidiary,
        status,
        month,
        year,
        dateFrom,
        dateTo,
        page = 1,
        perPage = 10
      } = data;

      const skip = (page - 1) * perPage;
      const [installments, total] = await this.ormRepository.createQueryBuilder("i")
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
            qb.andWhere("subsidiary.id = :subsidiary", { subsidiary })
          }
          if (status) {
            qb.andWhere("i.status IN (:...status)", { status: status })
          }
          if (buyer_name) {
            qb.andWhere("buyer.name ILIKE :buyer_name", { buyer_name: buyer_name + "%" })
          }
          if (month) {
            qb.andWhere('EXTRACT(MONTH FROM i.due_date) = :month', { month: month })
          }
          if (year) {
            qb.andWhere('EXTRACT(YEAR FROM i.due_date) = :year', { year: year })
          }

          if (dateFrom && dateTo) {
            qb.andWhere('i.due_date BETWEEN :dateFrom AND :dateTo', { dateFrom, dateTo })
          }
        }))
        .andWhere('sale.status = :statusSale', { statusSale: Status.PE })
        .orderBy("i.due_date", "DESC")
        .skip(skip)
        .take(perPage)
        .getManyAndCount();

      return { installments, totalInstallments: total };
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async listAllInstallments(data: { subsidiariesIds: string[], status: string }): Promise<Installment[]> {
    try {
      const { subsidiariesIds, status } = data;
      const installments = await this.ormRepository.createQueryBuilder("i")
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
        .where("i.status = :status", { status })
        .andWhere('subsidiary.id IN (:...subsidiariesIds)', { subsidiariesIds })
        .andWhere('sale.status = :statusSale', { statusSale: Status.PE})
        .orderBy("i.due_date", "ASC")
        .getMany();

      return installments;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async getAmountIntallmentsRecived(data: IRequestGetAmountInstallmentRecived): Promise<Installment[]> {
    try {
      const { subisidiaries, year, month,dateFrom,dateTo } = data;
      const installmentsRecived = await this.ormRepository.createQueryBuilder("i")
        .select(["i.id", "i.value"])
        .innerJoinAndSelect("i.sale", "sale")
        .innerJoinAndSelect("sale.subsidiary", "subsidiary")
        .where(new Brackets(qb => {
          if (subisidiaries) {
            qb.andWhere("subsidiary.id iN (:...subisidiaries)", { subisidiaries })
          }
          if (month) {
            qb.andWhere('EXTRACT(MONTH FROM i.due_date) = :month', { month: month })
          }
          if (year) {
            qb.andWhere('EXTRACT(YEAR FROM i.due_date) = :year', { year: year })
          }

          if (dateFrom && dateTo) {
            qb.andWhere('i.due_date BETWEEN :dateFrom AND :dateTo', { dateFrom, dateTo })
          }
        }))
        .andWhere("i.status IN (:...status)", { status: [StatusInstallment.PEN, StatusInstallment.VEN] })
        .andWhere('sale.status = :statusSale', { statusSale: Status.PE })
        .getMany();
      return installmentsRecived;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
  async getAmountIntallmentsPay(data: IRequestGetAmountInstallmentRecived): Promise<Installment[]> {
    try {
      const { subisidiaries, year, month,dateFrom,dateTo } = data;
      const installmentsRecived = await this.ormRepository.createQueryBuilder("i")
        .select(["i.id", "i.value"])
        .innerJoinAndSelect("i.sale", "sale")
        .innerJoinAndSelect("sale.subsidiary", "subsidiary")
        .where(new Brackets(qb => {
          if (subisidiaries) {
            qb.andWhere("subsidiary.id iN (:...subisidiaries)", { subisidiaries })
          }
          if (month) {
            qb.andWhere('EXTRACT(MONTH FROM i.due_date) = :month', { month: month })
          }
          if (year) {
            qb.andWhere('EXTRACT(YEAR FROM i.due_date) = :year', { year: year })
          }

          if (dateFrom && dateTo) {
            qb.andWhere('i.due_date BETWEEN :dateFrom AND :dateTo', { dateFrom, dateTo })
          }
        }))
        .andWhere("i.status = :status", { status: StatusInstallment.PAG })
        .andWhere('sale.status IN (:...statusSale)', { statusSale: [Status.PE, Status.PT] })
        .getMany();
      return installmentsRecived;
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
      installments.forEach(async (installment) => {
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

  async updateMultipleInstallments(ids: string[], data: IUpdateInstallmentDTO): Promise<void> {
    try {
      await this.ormRepository.update(ids, data);
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default InstallmentRespository;
