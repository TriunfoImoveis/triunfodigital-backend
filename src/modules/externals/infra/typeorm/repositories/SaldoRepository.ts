import { getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import ISaldoRepository from '@modules/externals/repositories/ISaldoRepository';
import Despesa from '@modules/externals/infra/typeorm/entities/Despesa';
import IResponseSaldoDTO from '@modules/externals/dtos/IResponseSaldoDTO';

class SaldoRepository implements ISaldoRepository {
  private ormRepository: Repository<Despesa>;

  constructor() {
    this.ormRepository = getRepository(Despesa);
  }

  async findAllEntrada(): Promise<void> {
    try {
      const saldos = await this.ormRepository.find();
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findAllSaida(): Promise<void> {
    try {
      const saldos = await this.ormRepository.find();
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default SaldoRepository;
