import { getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import IEscritorioRepository from '@modules/externals/repositories/IEscritorioRepository';
import Escritorio from '@modules/externals/infra/typeorm/entities/Escritorio';

class EscritorioRepository implements IEscritorioRepository {
  private ormRepository: Repository<Escritorio>;

  constructor() {
    this.ormRepository = getRepository(Escritorio);
  }

  async findAll(): Promise<Escritorio[]> {
    try {
      const escritorio = await this.ormRepository.find();
      return escritorio;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findById(id: string): Promise<Escritorio | undefined> {
    try {
      const escritorio = await this.ormRepository.findOne(id);
      return escritorio;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default EscritorioRepository;
