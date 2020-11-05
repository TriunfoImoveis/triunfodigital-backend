import ICreateClientDTO from "@modules/sales/dtos/ICreateClientDTO";
import IClientRepository from "@modules/sales/repositories/IClientRepository";
import AppError from '@shared/errors/AppError';
import Client from "@modules/sales/infra/typeorm/entities/Client";

class CreateClientService {
 constructor(private clientsRepository: IClientRepository) {}

 public async execute({
  name,
  cpf,
  date_birth,
  email,
  phone,
  whatsapp,
  occupation,
  civil_status,
  number_children,
  gender,
 }: ICreateClientDTO): Promise<Client> {
  const clientExists = await this.clientsRepository.findByCPF(cpf);

  if (clientExists) {
    return clientExists;
  }

  const client = await this.clientsRepository.createInstance({
    name,
    cpf,
    date_birth,
    email,
    phone,
    whatsapp,
    occupation,
    civil_status,
    number_children,
    gender,
  });

  if (!client) {
    throw new AppError('Error when creating the client, check your data');
  }

  return client;
 }
}

export default CreateClientService;
