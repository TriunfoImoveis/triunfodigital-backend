import { getRepository, Repository } from "typeorm";

import ICalculatorRepository from "@modules/finances/repositories/ICalculatorRepository";
import Calculator from "@modules/finances/infra/typeorm/entities/Calculator";
import AppError from "@shared/errors/AppError";
import ICreateCalculatorDTO from "@modules/finances/dtos/ICreateCalculatorDTO";
import Division from "../entities/Division";

class CalculatorRepository implements ICalculatorRepository {
  private ormRepository: Repository<Calculator>;

  constructor() {
    this.ormRepository = getRepository(Calculator);
  }

  async create(data: ICreateCalculatorDTO): Promise<Calculator> {
    try {
      const calculation = this.ormRepository.create(data);
      const newCalculation = await this.ormRepository.save(calculation);

      return newCalculation;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default CalculatorRepository;