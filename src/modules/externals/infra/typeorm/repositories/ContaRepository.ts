import { getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import IContaRepository from '@modules/externals/repositories/IContaRepository';
import Conta from '@modules/externals/infra/typeorm/entities/Conta';

class ContaRepository implements IContaRepository {
  private ormRepository: Repository<Conta>;

  constructor() {
    this.ormRepository = getRepository(Conta);
  }

  async findAll(): Promise<Conta[]> {
    try {
      const conta = await this.ormRepository.find();
      return conta;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findById(id: string): Promise<Conta | undefined> {
    try {
      const conta = await this.ormRepository.findOne(id);
      return conta;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default ContaRepository;
