import Client from '@modules/sales/infra/typeorm/entities/Client';


export default interface IClientRepository {
  findByName(name: string): Promise<Client | undefined>;
  findById(id: string): Promise<Client | undefined>;
  findClientsActive(): Promise<Client[]>;
}
