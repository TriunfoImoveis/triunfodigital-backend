import { getRepository, Repository } from "typeorm";

import IDivisionRepository from "@modules/finances/repositories/IDivisionRepository";
import Division from "@modules/finances/infra/typeorm/entities/Division";
import ICreateDivisionDTO from "@modules/finances/dtos/ICreateDivisionDTO";
import AppError from "@shared/errors/AppError";

class DivisiionRepository implements IDivisionRepository {
  private ormRepository: Repository<Division>;

  constructor() {
    this.ormRepository = getRepository(Division);
  }

  async create(data: ICreateDivisionDTO): Promise<Division> {
    try {
      const division = this.ormRepository.create(data);
      const newDivision = await this.ormRepository.save(division);

      return newDivision;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default DivisiionRepository;