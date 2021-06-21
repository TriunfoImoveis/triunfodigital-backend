import AppError from '@shared/errors/AppError';
import Client from "@modules/sales/infra/typeorm/entities/Client";
import IClientRepository from "@modules/sales/repositories/IClientRepository";

interface IRequestDTO {
  cpf?: string;
  cnpj?: string;
}

class ListClientService {
  constructor(private clientRepository: IClientRepository) {}

  public async execute({ cpf, cnpj }: IRequestDTO): Promise<Client | Client[]> {

    const cpf_cnpj = cpf ? cpf : cnpj;

    var client;
    if (cpf_cnpj) {
      client = await this.clientRepository.findByCPFOrCNPJ(cpf_cnpj);
    } else {
      client = await this.clientRepository.findClientsActive();
    }

    if (!client) {
      throw new AppError("Cliente não existe.", 404);
    }

    return client;
  }
}

export default ListClientService;
