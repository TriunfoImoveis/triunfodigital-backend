import AppError from '@shared/errors/AppError';
import Client from "@modules/sales/infra/typeorm/entities/Client";
import IClientRepository from "@modules/sales/repositories/IClientRepository";

interface IRequestDTO {
  cpf: string | undefined;
}

class ListClientService {
  constructor(private clientRepository: IClientRepository) {}

  public async execute({ cpf }: IRequestDTO): Promise<Client | Client[] | undefined> {

    var client;
    if (cpf) {
      client = await this.clientRepository.findByCPF(cpf);
    } else {
      client = await this.clientRepository.findClientsActive();
    }

    return client;
  }
}

export default ListClientService;
