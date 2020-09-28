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
  occupation,
  civil_status,
  number_children,
  gender,
 }: ICreateClientDTO): Promise<Client> {
  const checkClientExists = await this.clientsRepository.findByCPF(cpf);

  if (checkClientExists) {
    throw new AppError('Client already exists.');
  }

  const client = await this.clientsRepository.create({
    name,
    cpf,
    date_birth,
    email,
    phone,
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
