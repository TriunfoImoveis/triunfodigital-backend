import { Repository, getRepository } from 'typeorm';

import Client from '@modules/sales/infra/typeorm/entities/Client';
import IClientRepository from '@modules/sales/repositories/IClientRepository';
import ICreateClientDTO from '@modules/sales/dtos/ICreateClientDTO';
import IUpdateClientDTO from '@modules/sales/dtos/IUpdateClientDTO';


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
      where: { name },
    });
    return client;
  }

  async findByCPF(cpf: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({
      where: { cpf },
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

  async create(data: ICreateClientDTO): Promise<Client> {
    const client = this.ormRepository.create(data);
    const newClient = await this.ormRepository.save(client);

    return newClient;
  }

  async update(id: string, data: IUpdateClientDTO): Promise<Client | undefined> {
    await this.ormRepository.update(id, data);
    const clientUpdated = await this.ormRepository.findOne(id);

    return clientUpdated;
  }
}

export default ClientsReository;
