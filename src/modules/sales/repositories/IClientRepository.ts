import Client from '@modules/sales/infra/typeorm/entities/Client';
import ICreateClientDTO from '@modules/sales/dtos/ICreateClientDTO';
import IUpdateClientDTO from '../dtos/IUpdateClientDTO';


export default interface IClientRepository {
  findByName(name: string): Promise<Client | undefined>;
  findById(id: string): Promise<Client | undefined>;
  findByIdAndActivate(id: string): Promise<Client | undefined>;
  findByCPFOrCNPJ(cpf_cnpj: string): Promise<Client | undefined>;
  findClientsActive(): Promise<Client[]>;

  createInstance(data: ICreateClientDTO): Promise<Client | undefined>;
  update(id: string, data: IUpdateClientDTO): Promise<Client | undefined>;
  activate(id: string): Promise<Client | undefined>;
  deactivate(id: string): Promise<void>;
}
