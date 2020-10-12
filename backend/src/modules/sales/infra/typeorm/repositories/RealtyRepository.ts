import { getRepository, Repository } from "typeorm";

import AppError from '@shared/errors/AppError';
import ICreateRealtyDTO from "@modules/sales/dtos/ICreateRealtyDTO";
import IRealtyRepository from "@modules/sales/repositories/IRealtyRepository";
import Realty from "@modules/sales/infra/typeorm/entities/Realty";

class RealtyRepository implements IRealtyRepository {
  private ormRepository: Repository<Realty>;

  constructor() {
    this.ormRepository = getRepository(Realty);
  }

  async findAll(): Promise<Realty[]> {
    const realties = await this.ormRepository.find();
    return realties;
  }

  async findById(id: string): Promise<Realty | undefined> {
    const realty = await this.ormRepository.findOne(id);
    return realty;
  }

  async create(data: ICreateRealtyDTO): Promise<Realty | undefined> {
    try {
      const realty = this.ormRepository.create(data);
      // const newRealty = await this.ormRepository.save(realty);
      return realty;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default RealtyRepository;
