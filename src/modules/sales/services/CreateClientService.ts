import ICreateClientDTO from "@modules/sales/dtos/ICreateClientDTO";
import IClientRepository from "@modules/sales/repositories/IClientRepository";
import AppError from '@shared/errors/AppError';
import Client from "@modules/sales/infra/typeorm/entities/Client";
import { add } from "date-fns";

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
    date_birth: add(date_birth, {hours: 3}),
    email,
    phone,
    whatsapp,
    occupation,
    civil_status,
    number_children,
    gender,
  });

  if (!client) {
    throw new AppError(
      "Erro durante a criação do cliente, ckeck seus dados",
      400
    );
  }

  return client;
 }
}

export default CreateClientService;
