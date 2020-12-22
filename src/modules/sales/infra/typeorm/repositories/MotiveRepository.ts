import { getRepository, Repository } from "typeorm";

import AppError from '@shared/errors/AppError';
import IMotiveRepository from "@modules/sales/repositories/IMotiveRepository";
import Motive from "@modules/sales/infra/typeorm/entities/Motive";
import ICreateMotiveDTO from "@modules/sales/dtos/ICreateMotiveDTO";

class MotiveRepository implements IMotiveRepository {
  private ormRepository: Repository<Motive>;

  constructor() {
    this.ormRepository = getRepository(Motive);
  }

  async findAll(): Promise<Motive[]> {
    try {
      const motives = await this.ormRepository.find({
        order: {
          description: "ASC",
        },
      });

      return motives;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findById(id: string): Promise<Motive | undefined> {
    try {
      const motive = await this.ormRepository.findOne(id);

      return motive;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async create(data: ICreateMotiveDTO): Promise<Motive | undefined> {
    try {
      const motive = this.ormRepository.create(data);
      const newMotive = await this.ormRepository.save(motive);

      return newMotive;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default MotiveRepository;
