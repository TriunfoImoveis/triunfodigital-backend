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
      const client = await this.ormRepository.findOne(id);
      return client;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findByIdAndActivate(id: string): Promise<Client | undefined> {
    try {
      const client = await this.ormRepository.findOne(
        id,
        {
          where: { active: true }
        }
      );
      return client;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findByName(name: string): Promise<Client | undefined> {
    try {
      const client = await this.ormRepository.findOne({
        where: { name },
      });
      return client;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findByCPF(cpf: string): Promise<Client | undefined> {
    try {
      const client = await this.ormRepository.findOne({
        where: { cpf },
      });
      return client;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findClientsActive(): Promise<Client[]> {
    try {
      const clients = await this.ormRepository.find({
        where: {
          active: true,
        },
      });

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
      const clientUpdated = await this.ormRepository.findOne(id);
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
      const client = await this.ormRepository.findOne(id);
      return client;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default ClientsRepository;
