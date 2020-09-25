import { Repository, getRepository } from 'typeorm';

import Client from '@modules/sales/infra/typeorm/entities/Client';
import IClientRepository from '@modules/sales/repositories/IClientRepository';


class ClientsReository implements IClientRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  async findById(id: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne(id);
    return client;
  }

  async findByName(name: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({
      where: name,
    });
    return client;
  }

  async findClientsActive(): Promise<Client[]> {
    const clients = await this.ormRepository.find({
      where: {
        active: true,
      }
    });

    return clients;
  }
}

export default ClientsReository;
