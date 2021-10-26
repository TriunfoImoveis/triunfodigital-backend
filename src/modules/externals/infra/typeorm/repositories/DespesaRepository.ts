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
      const despesa = await this.ormRepository.find({
        relations: ['escritorio', 'conta']
      });
      return despesa;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findById(id: string): Promise<Despesa | undefined> {
    try {
      const despesa = await this.ormRepository.findOne(id, {
        relations: ['escritorio', 'conta']
      });
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

  async delete(id: string): Promise<void> {
    try {
      this.ormRepository.delete(id);
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findSaldoByFilial(): Promise<void> {
    try {
      const saldos = await this.ormRepository.createQueryBuilder("despesas")
        .select("escritorio.nome")
        .innerJoinAndSelect("despesas.escritorio", "escritorio")
        .where("despesas.tipo_despesa IN (:...tipo)", {tipo: ["ENTRADA"]})
        .getMany();
      console.log(saldos)
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findSaldoByConta(): Promise<void> {
    
  }
}

export default DespesaRepository;
