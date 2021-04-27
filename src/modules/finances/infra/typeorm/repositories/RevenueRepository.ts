import { getRepository, Repository } from "typeorm";

import IRevenueRepository from "@modules/finances/repositories/IRevenueRepository";
import Revenue from "@modules/finances/infra/typeorm/entities/Revenue";
import AppError from "@shared/errors/AppError";
import ICreateRevenueDTO from "@modules/finances/dtos/ICreateRevenueDTO";

class RevenueRepository implements IRevenueRepository {
  private ormRepository: Repository<Revenue>;
  
  constructor() {
    this.ormRepository = getRepository(Revenue);
  }

  async list(): Promise<Revenue[]> {
    try {
      const revenues = await this.ormRepository.find();
      return revenues;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async create(data: ICreateRevenueDTO): Promise<Revenue> {
    try {
      const revenueInstance = this.ormRepository.create(data);
      const revenue = await this.ormRepository.save(revenueInstance);

      return revenue;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default RevenueRepository;