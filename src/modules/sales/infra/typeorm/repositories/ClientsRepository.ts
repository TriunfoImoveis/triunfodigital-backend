import { Repository, getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Client from '@modules/sales/infra/typeorm/entities/Client';
import IClientRepository from '@modules/sales/repositories/IClientRepository';
import ICreateClientDTO from '@modules/sales/dtos/ICreateClientDTO';
import IUpdateClientDTO from '@modules/sales/dtos/IUpdateClientDTO';


class ClientsRepository implements IClientRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  async findById(id: string): Promise<Client | undefined> {
    try {
       const client = await this.ormRepository
        .createQueryBuilder('client')
        .leftJoin('client.profession', 'profession')
        .select([
          'client',
          'profession.id',
          'profession.name',
          'profession.normalized_name',
        ])
        .where('client.id = :id', { id })
        .getOne();

      return client;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findByIdAndActivate(id: string): Promise<Client | undefined> {
    try {
     const client = await this.ormRepository
        .createQueryBuilder('client')
        .leftJoin('client.profession', 'profession')
        .select([
          'client',
          'profession.id',
          'profession.name',
          'profession.normalized_name',
        ])
        .where('client.id = :id', { id })
        .andWhere('client.active = true')
        .getOne();

      return client;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findByName(name: string): Promise<Client | undefined> {
    try {
      const client = await this.ormRepository
        .createQueryBuilder('client')
        .leftJoin('client.profession', 'profession')
        .select([
          'client',
          'profession.id',
          'profession.name',
          'profession.normalized_name',
        ])
        .where('client.name = :name', { name })
        .getOne();

      return client;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findByCPFOrCNPJ(cpf_cnpj: string): Promise<Client | undefined> {
    try {
      const client = await this.ormRepository
        .createQueryBuilder('client')
        .leftJoin('client.profession', 'profession')
        .select([
          'client',
          'profession.id',
          'profession.name',
          'profession.normalized_name',
        ])
        .where('client.cpf = :cpf', { cpf: cpf_cnpj })
        .orWhere('client.cnpj = :cnpj', { cnpj: cpf_cnpj })
        .getOne();

      return client;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findClientsActive(): Promise<Client[]> {
    try {
      const clients = await this.ormRepository
        .createQueryBuilder('client')
        .leftJoin('client.profession', 'profession')
        .select([
          'client',
          'profession.id',
          'profession.name',
          'profession.normalized_name',
        ])
        .where('client.active = true')
        .orderBy('client.name', 'ASC')
        .getMany();

      return clients;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async createInstance(data: ICreateClientDTO): Promise<Client | undefined> {
    try {
      const client = this.ormRepository.create(data);

      return client;
    } catch (err) {
      throw new AppError(err);
    }
  }

  async update(id: string, data: IUpdateClientDTO): Promise<Client | undefined> {
    try {
      await this.ormRepository.update(id, data);
      const clientUpdated = await this.findById(id);
      return clientUpdated;
    } catch (err) {
      throw new AppError(err);
    }
  }

  async deactivate(id: string): Promise<void> {
    try {
      await this.ormRepository.update(id, {active: false});
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async activate(id: string): Promise<Client | undefined> {
    try {
      await this.ormRepository.update(id, {active: true});
      const client = await this.ormRepository.findOne(id, {
        relations: ['profession'],
      });
      return client;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default ClientsRepository;
