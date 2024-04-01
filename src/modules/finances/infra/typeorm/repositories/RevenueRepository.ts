import { Brackets, getRepository, QueryFailedError, Repository } from "typeorm";

import IRevenueRepository from "@modules/finances/repositories/IRevenueRepository";
import Revenue from "@modules/finances/infra/typeorm/entities/Revenue";
import AppError from "@shared/errors/AppError";
import ICreateRevenueDTO from "@modules/finances/dtos/ICreateRevenueDTO";
import IUpdateRevenueDTO from "@modules/finances/dtos/IUpdateRevenueDTO";
import IRequestRevenueDTO from "@modules/finances/dtos/IRequestRevenueDTO";
import IResponseRevenueDTO from "@modules/finances/dtos/IResponseRevenueDTO";

class RevenueRepository implements IRevenueRepository {
  private ormRepository: Repository<Revenue>;

  constructor() {
    this.ormRepository = getRepository(Revenue);
  }

  async listAll(): Promise<Revenue[]> {
    try {
      const revenues = await this.ormRepository
        .createQueryBuilder("revenue")
        .leftJoinAndSelect("revenue.subsidiary", "subsidiary")
        .leftJoinAndSelect("revenue.bank_data", "bank_data")
        .orderBy("revenue.due_date", "DESC")
        .getMany();


      return revenues;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);

    }
  }

  async list(data: IRequestRevenueDTO): Promise<IResponseRevenueDTO> {
    const {subsidiary, dateFrom, dateTo, month, year, status, revenue_type, page = 1, perPage = 10, sort = 'DESC'} = data;
    const skip = (page - 1) * perPage;
    try {
      let querybuilder = this.ormRepository
        .createQueryBuilder("revenue")
        .leftJoinAndSelect("revenue.subsidiary", "subsidiary")
        .leftJoinAndSelect("revenue.bank_data", "bank_data")
        .where(new Brackets(qb => {
          if (subsidiary) {
            qb.andWhere("subsidiary.id = :subsidiary", { subsidiary: subsidiary})
          }
          if (revenue_type) {
            qb.andWhere("revenue.revenue_type = :revenue_type", { revenue_type: revenue_type })
          }
          if (status) {
            qb.andWhere("revenue.status IN (:...status)", { status: status })
          }
          if (month) {
            qb.andWhere('EXTRACT(MONTH FROM revenue.due_date) = :month', { month: month })
          }
          if (year) {
            qb.andWhere('EXTRACT(YEAR FROM revenue.due_date) = :year', { year: year })
          }

          if (dateFrom && dateTo) {
            qb.andWhere('revenue.due_date BETWEEN :dateFrom AND :dateTo', { dateFrom, dateTo })
          }
        }))
        .orderBy("revenue.due_date", sort)

        const totalValueIntegral = await querybuilder
          .getMany()
          .then(revenues => revenues.reduce((acc, curr) => acc + Number(curr.value_integral), 0));

          const [revenues, totalCount] = await querybuilder
          .skip(skip)
          .take(perPage)
          .getManyAndCount();

      return {revenues, total: totalCount, totalValueIntegralRevenues: totalValueIntegral};
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);

    }
  }

  async listAndFilterByPayDate(data: IRequestRevenueDTO): Promise<IResponseRevenueDTO> {
    const {subsidiary, dateFrom, dateTo, month, year, status, revenue_type, page = 1, perPage = 10, sort = 'DESC'} = data;
    const skip = (page - 1) * perPage;
    try {
      let querybuilder = this.ormRepository
        .createQueryBuilder("revenue")
        .leftJoinAndSelect("revenue.subsidiary", "subsidiary")
        .leftJoinAndSelect("revenue.bank_data", "bank_data")
        .where(new Brackets(qb => {
          if (subsidiary) {
            qb.andWhere("subsidiary.id = :subsidiary", { subsidiary: subsidiary})
          }
          if (revenue_type) {
            qb.andWhere("revenue.revenue_type = :revenue_type", { revenue_type: revenue_type })
          }
          if (status) {
            qb.andWhere("revenue.status IN (:...status)", { status: status })
          }
          if (month) {
            qb.andWhere('EXTRACT(MONTH FROM revenue.pay_date) = :month', { month: month })
          }
          if (year) {
            qb.andWhere('EXTRACT(YEAR FROM revenue.pay_date) = :year', { year: year })
          }

          if (dateFrom && dateTo) {
            qb.andWhere('revenue.pay_date BETWEEN :dateFrom AND :dateTo', { dateFrom, dateTo })
          }
        }))
        .orderBy("revenue.pay_date", sort)

        const totalValueIntegral = await querybuilder
          .getMany()
          .then(revenues => revenues.reduce((acc, curr) => acc + Number(curr.value_integral), 0));

          const [revenues, totalCount] = await querybuilder
          .skip(skip)
          .take(perPage)
          .getManyAndCount();

      return {revenues, total: totalCount, totalValueIntegralRevenues: totalValueIntegral};
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);

    }
  }

  async findById(id: string): Promise<Revenue | undefined> {
    try {
      const revenue = await this.ormRepository.findOne(id, {relations: ["subsidiary", "bank_data"]});
      return revenue;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }
    }
  }

  async create(data: ICreateRevenueDTO): Promise<Revenue> {
    try {
      const revenueInstance = this.ormRepository.create(data);
      const revenue = await this.ormRepository.save(revenueInstance);

      return revenue;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }

      throw new AppError('Internal Server Error', 500);
    }
  }

  async update(id: string, data: IUpdateRevenueDTO): Promise<void> {
    try {
      await this.ormRepository.update(id, data);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new AppError(err.message, 500);
      }
    }
  }
}

export default RevenueRepository;
