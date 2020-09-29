import Client from '@modules/sales/infra/typeorm/entities/Client';
import ICreateClientDTO from '@modules/sales/dtos/ICreateClientDTO';
import IUpdateClientDTO from '../dtos/IUpdateClientDTO';


export default interface IClientRepository {
  findByName(name: string): Promise<Client | undefined>;
  findById(id: string): Promise<Client | undefined>;
  findByCPF(cpf: string): Promise<Client | undefined>;
  findClientsActive(): Promise<Client[]>;
  create(data: ICreateClientDTO): Promise<Client>;
  update(id: string, data: IUpdateClientDTO): Promise<Client | undefined>;
}
