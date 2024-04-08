import { Brackets, getRepository, QueryFailedError, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import ICreateInstallmentDTO from '@modules/finances/dtos/ICreateInstallmentDTO';
import IInstallmentRepository from '@modules/finances/repositories/IInstallmentRepository';
import Installment, { StatusInstallment } from '@modules/finances/infra/typeorm/entities/Installment';
import IUpdateInstallmentDTO from '@modules/finances/dtos/IUpdateInstallmentDTO';
import IRequestInstallmentDTO from '@modules/finances/dtos/IRequestInstallmentDTO';
import IResponseInstallmentDTO from '@modules/finances/dtos/IResponseInstallmentDTO';
import { IRequestGetAmountInstallmentRecived } from '@modules/finances/dtos/IGetAmoutInstallmentRecived';
import { Status } from '@modules/sales/infra/typeorm/entities/Sale';
import IRequestGetInstallmentsEntryDTO from '@modules/finances/dtos/IResquestGetInstallmentEntryDTO';
import { ParticipantType } from '../entities/Comission';
import { IListInstallmentsDTO } from '@modules/finances/dtos/IListAllInstallmentsDTO';
import { generateLiquidValue } from '@shared/utils/dashboard_utils';

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

      let querybuilder = this.ormRepository.createQueryBuilder("i")
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
        .orderBy("i.due_date", "DESC")

      const totalValueInstallments = await querybuilder
        .getMany()
        .then(expenses => expenses.reduce((acc, curr) => acc + Number(curr.value), 0));

      const [installments, total] = await querybuilder
        .skip(skip)
        .take(perPage)
        .getManyAndCount();

      return { installments, totalInstallments: total, totalValueInstallments };
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }

  async listAllInstallments(data: IListInstallmentsDTO): Promise<Installment[]> {
    try {
      const { subsidiariesIds, status, month, year, dateFrom, dateTo } = data;
      let atributeSearch = 'i.due_date';
      atributeSearch = status && status === StatusInstallment.PAG ? 'i.pay_date' : 'i.due_date';
      atributeSearch = status && status === StatusInstallment.LIQ ? 'calculation.pay_date' : 'i.due_date';
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
        .where(new Brackets(qb => {
          if (subsidiariesIds) {
            qb.andWhere("subsidiary.id IN (:...subsidiariesIds)", { subsidiariesIds })
          }
          if (status) {
            qb.andWhere("i.status = :status", { status })
          }
          if (status && status === StatusInstallment.LIQ) {
            if (month) {
              qb.andWhere('EXTRACT(MONTH FROM calculation.pay_date) = :month', { month: month })
            }
            if (year) {
              qb.andWhere('EXTRACT(YEAR FROM calculation.pay_date) = :year', { year: year })
            }

            if (dateFrom && dateTo) {
              qb.andWhere('calculation.pay_date BETWEEN :dateFrom AND :dateTo', { dateFrom, dateTo })
            }
          } else if (status && status === StatusInstallment.PAG) {
            if (month) {
              qb.andWhere('EXTRACT(MONTH FROM i.pay_date) = :month', { month: month })
            }
            if (year) {
              qb.andWhere('EXTRACT(YEAR FROM i.pay_date) = :year', { year: year })
            }

            if (dateFrom && dateTo) {
              qb.andWhere('i.pay_date BETWEEN :dateFrom AND :dateTo', { dateFrom, dateTo })
            }
          } else {
            if (month) {
              qb.andWhere('EXTRACT(MONTH FROM i.due_date) = :month', { month: month })
            }
            if (year) {
              qb.andWhere('EXTRACT(YEAR FROM i.due_date) = :year', { year: year })
            }

            if (dateFrom && dateTo) {
              qb.andWhere('i.due_date BETWEEN :dateFrom AND :dateTo', { dateFrom, dateTo })
            }
          }
        }))
        .orderBy(atributeSearch, "ASC")
        .getMany();

      return installments;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }

  async getInstallmentsEntry(data: IRequestGetInstallmentsEntryDTO): Promise<IResponseInstallmentDTO> {
    try {
      const {
        buyer_name,
        subsidiary,
        month,
        year,
        dateFrom,
        dateTo,
        page = 1,
        perPage = 10,
        sort = 'DESC'
      } = data;

      const skip = (page - 1) * perPage;

      let querybuilder = this.ormRepository.createQueryBuilder("i")
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
          if (buyer_name) {
            qb.andWhere("buyer.name ILIKE :buyer_name", { buyer_name: buyer_name + "%" })
          }
          if (month) {
            qb.andWhere('EXTRACT(MONTH FROM calculation.pay_date) = :month', { month: month })
          }
          if (year) {
            qb.andWhere('EXTRACT(YEAR FROM calculation.pay_date) = :year', { year: year })
          }

          if (dateFrom && dateTo) {
            qb.andWhere('calculation.pay_date BETWEEN :dateFrom AND :dateTo', { dateFrom, dateTo })
          }
        }))
        .andWhere("i.status = :status", { status: StatusInstallment.LIQ })
        .orderBy("calculation.pay_date", sort)

      const comission = await querybuilder
        .getMany()
        .then(installments => installments.map(installment => generateLiquidValue({installment, type: ParticipantType.EMP})).reduce((total, comission) => {
            return total + Number(comission)
          }, 0))

      const [installments, total] = await querybuilder
        .skip(skip)
        .take(perPage)
        .getManyAndCount();

      return { installments, totalInstallments: total, totalValueInstallments: comission };
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }

  async getAmountIntallmentsRecived(data: IRequestGetAmountInstallmentRecived): Promise<Installment[]> {
    try {
      const { subisidiaries, year, month, dateFrom, dateTo } = data;
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
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }
  async getAmountIntallmentsPay(data: IRequestGetAmountInstallmentRecived): Promise<Installment[]> {
    try {
      const { subisidiaries, year, month, dateFrom, dateTo } = data;
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
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }


  async create(installments: ICreateInstallmentDTO[]): Promise<Installment[]> {
    try {
      const installmentsInstance = this.ormRepository.create(installments);
      const listInstallment = await this.ormRepository.save(installmentsInstance);
      return listInstallment;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }

  async delete(installments: Installment[]): Promise<void> {
    try {
      installments.forEach(async (installment) => {
        await this.ormRepository.delete(installment.id);
      });
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }

  async findById(id: string): Promise<Installment | undefined> {
    try {
      const installment = await this.ormRepository.findOne(id, {
        relations: ['sale', 'sale.builder']
      });
      return installment;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }

  async update(id: string, data: IUpdateInstallmentDTO): Promise<void> {
    try {
      await this.ormRepository.update(id, data);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }

  async updateMultipleInstallments(ids: string[], data: IUpdateInstallmentDTO): Promise<void> {
    try {
      await this.ormRepository.update(ids, data);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }
}

export default InstallmentRespository;
