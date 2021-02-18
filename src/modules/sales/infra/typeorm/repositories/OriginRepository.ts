import { getRepository, Repository } from "typeorm";

import AppError from '@shared/errors/AppError';
import IOriginRepository from "@modules/sales/repositories/IOriginRepository";
import OriginSale from "@modules/sales/infra/typeorm/entities/OriginSale";
import ICreateOriginDTO from "@modules/sales/dtos/ICreateOriginDTO";

class OriginsRepository implements IOriginRepository {
  private ormRepository: Repository<OriginSale>;

  constructor() {
    this.ormRepository = getRepository(OriginSale);
  }

  async findAll(): Promise<OriginSale[]> {
    try {
      const origins = await this.ormRepository.find({
        where: {
          active: true
        },
        order: {
          name: "ASC",
        },
        cache: true,
      });

      return origins;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findById(id: string): Promise<OriginSale | undefined> {
    try {
      const origin = await this.ormRepository.findOne(id);

      return origin;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async create(data: ICreateOriginDTO): Promise<OriginSale | undefined> {
    try {
      const origin = this.ormRepository.create(data);
      const newOrigin = await this.ormRepository.save(origin);

      return newOrigin;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default OriginsRepository;
