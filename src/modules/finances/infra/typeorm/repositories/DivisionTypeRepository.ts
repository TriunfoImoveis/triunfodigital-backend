import { getRepository, Repository } from "typeorm";

import IDivisionTypeRepository from "@modules/finances/repositories/IDivisionTypeRepository";
import DivisionType from "@modules/finances/infra/typeorm/entities/DivisionType";
import AppError from "@shared/errors/AppError";

class DivisionTypeRepository implements IDivisionTypeRepository {
  private ormRepository: Repository<DivisionType>;

  constructor() {
    this.ormRepository = getRepository(DivisionType);
  }

  async findAll(): Promise<DivisionType[]> {
    try {
      const division_types = await this.ormRepository.find();
      return division_types;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async create(name: string): Promise<void> {
    try {
      const division = this.ormRepository.create({name});
      await this.ormRepository.save(division);
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default DivisionTypeRepository;