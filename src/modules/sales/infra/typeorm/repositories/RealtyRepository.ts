import { getRepository, Repository } from "typeorm";

import AppError from '@shared/errors/AppError';
import ICreateRealtyDTO from "@modules/sales/dtos/ICreateRealtyDTO";
import IRealtyRepository from "@modules/sales/repositories/IRealtyRepository";
import Realty from "@modules/sales/infra/typeorm/entities/Realty";
import IUpdateRealtyDTO from "@modules/sales/dtos/IUpdateRealtyDTO";

class RealtyRepository implements IRealtyRepository {
  private ormRepository: Repository<Realty>;

  constructor() {
    this.ormRepository = getRepository(Realty);
  }

  async findAll(): Promise<Realty[]> {
    try {
      const realties = await this.ormRepository.find();
      return realties;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findById(id: string): Promise<Realty | undefined> {
    try {
      const realty = await this.ormRepository.findOne(id);
      return realty;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async createInstance(data: ICreateRealtyDTO): Promise<Realty | undefined> {
    try {
      const realty = this.ormRepository.create(data);

      return realty;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async update(id: string, body: IUpdateRealtyDTO): Promise<void> {
    try {
      await this.ormRepository.update(id, body);
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default RealtyRepository;
