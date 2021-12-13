import { getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import IDespesaRepository from '@modules/externals/repositories/IDespesaRepository';
import Despesa from '@modules/externals/infra/typeorm/entities/Despesa';
import ICreateDespesaDTO from '@modules/externals/dtos/ICreateDespesaDTO';
import IRequestSaldoDTO from '@modules/externals/dtos/IRequestSaldoDTO';
import IUpdateDespesaDTO from '@modules/externals/dtos/IUpdateDespesaDTO';

class DespesaRepository implements IDespesaRepository {
  private ormRepository: Repository<Despesa>;

  constructor() {
    this.ormRepository = getRepository(Despesa);
  }

  async findAll(): Promise<Despesa[]> {
    try {
      const despesa = await this.ormRepository.find({
        relations: ['escritorio', 'conta', 'grupo']
      });
      return despesa;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findById(id: string): Promise<Despesa | undefined> {
    try {
      const despesa = await this.ormRepository.findOne(id, {
        relations: ['escritorio', 'conta', 'grupo']
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

  async findByFilters({
    escritorio, 
    conta,
    data_inicio,
    data_fim,
  }: IRequestSaldoDTO): Promise<Despesa[]> {
    try {
      const despesas = await this.ormRepository.createQueryBuilder("despesa")
      .select()
      .innerJoinAndSelect("despesa.grupo", "grupo")
      .innerJoinAndSelect("despesa.escritorio", "escritorio")
      .innerJoinAndSelect("despesa.conta", "conta")
      .where("escritorio.id::text LIKE :escritorio", {escritorio: escritorio})
      .andWhere("conta.id::text LIKE :conta", { conta: conta })
      .andWhere(
        "despesa.data_pagamento BETWEEN :inicio AND :fim", 
        {inicio: data_inicio, fim: data_fim}
      ).getMany();

      return despesas;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async update(id: string, data: IUpdateDespesaDTO): Promise<void> {
    try {
      await this.ormRepository.update(id, data);
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default DespesaRepository;
