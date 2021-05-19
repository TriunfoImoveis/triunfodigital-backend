import { getConnection, getRepository, Repository } from "typeorm";

import ICalculatorRepository from "@modules/finances/repositories/ICalculatorRepository";
import Calculator from "@modules/finances/infra/typeorm/entities/Calculator";
import AppError from "@shared/errors/AppError";
import ICreateCalculatorDTO from "@modules/finances/dtos/ICreateCalculatorDTO";

class CalculatorRepository implements ICalculatorRepository {
  private ormRepository: Repository<Calculator>;

  constructor() {
    this.ormRepository = getRepository(Calculator);
  }

  async create(data: ICreateCalculatorDTO): Promise<Calculator> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    const {divisions, participants} = data;
    const calculator = this.ormRepository.create(data);
    
    await queryRunner.startTransaction();
    try {
      const newCalculator = await queryRunner.manager.save(calculator);
      
      divisions.forEach(division => {
        division.calculation = newCalculator;
      });

      participants.forEach(participant => {
        participant.calculation = newCalculator;
      });
      
      await queryRunner.manager.save('Division', divisions);
      await queryRunner.manager.save('Comission', participants);

      await queryRunner.commitTransaction();
      return newCalculator;
    } catch (err) {

      await queryRunner.rollbackTransaction();
      throw new AppError(err.detail);

    } finally {
      await queryRunner.release();
    }
  }
}

export default CalculatorRepository;