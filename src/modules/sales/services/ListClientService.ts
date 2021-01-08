import AppError from '@shared/errors/AppError';
import Client from "@modules/sales/infra/typeorm/entities/Client";
import IClientRepository from "@modules/sales/repositories/IClientRepository";

interface IRequestDTO {
  cpf?: string;
}

class ListClientService {
  constructor(private clientRepository: IClientRepository) {}

  public async execute({ cpf }: IRequestDTO): Promise<Client | Client[]> {

    var client;
    if (cpf) {
      client = await this.clientRepository.findByCPF(cpf);
    } else {
      client = await this.clientRepository.findClientsActive();
    }

    if (!client) {
      throw new AppError("Client not exists.", 404);
    }

    return client;
  }
}

export default ListClientService;
