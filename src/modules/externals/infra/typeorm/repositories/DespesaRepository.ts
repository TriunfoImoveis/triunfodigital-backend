import { getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import IDespesaRepository from '@modules/externals/repositories/IDespesaRepository';
import Despesa from '@modules/externals/infra/typeorm/entities/Despesa';
import ICreateDespesaDTO from '@modules/externals/dtos/ICreateDespesaDTO';

class DespesaRepository implements IDespesaRepository {
  private ormRepository: Repository<Despesa>;

  constructor() {
    this.ormRepository = getRepository(Despesa);
  }

  async findAll(): Promise<Despesa[]> {
    try {
      const despesa = await this.ormRepository.find();
      return despesa;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findById(id: string): Promise<Despesa | undefined> {
    try {
      const despesa = await this.ormRepository.findOne(id);
      return despesa;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async create(data: ICreateDespesaDTO): Promise<Despesa> {
    try {
      const despesaInstance = this.ormRepository.create(data);
      const despesa = await this.ormRepository.save(despesaInstance);
      return despesa;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default DespesaRepository;
