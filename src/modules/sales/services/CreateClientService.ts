import { add } from "date-fns";
import { inject, injectable } from "tsyringe";

import ICreateClientDTO from "@modules/sales/dtos/ICreateClientDTO";
import IClientRepository from "@modules/sales/repositories/IClientRepository";
import AppError from '@shared/errors/AppError';
import Client from "@modules/sales/infra/typeorm/entities/Client";

@injectable()
class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientRepository,
  ) {}

  public async execute({
    name,
    cpf,
    cnpj,
    date_birth,
    email,
    phone,
    whatsapp,
    occupation,
    civil_status,
    number_children,
    gender,
    address,
  }: ICreateClientDTO): Promise<Client> {
    const cpf_cnpj = cpf ? cpf : cnpj;
    const clientExists = await this.clientsRepository.findByCPFOrCNPJ(String(cpf_cnpj));

    if (clientExists) {
      return clientExists;
    }

    const date_birth_formated = date_birth ? add(date_birth, {hours: 3}) : undefined;

    const client = await this.clientsRepository.createInstance({
      name,
      cpf,
      cnpj,
      date_birth: date_birth_formated,
      email,
      phone,
      whatsapp,
      occupation,
      civil_status,
      number_children,
      gender,
      address,
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
