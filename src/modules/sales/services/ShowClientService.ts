import AppError from '@shared/errors/AppError';
import Client from "@modules/sales/infra/typeorm/entities/Client";
import IClientRepository from "@modules/sales/repositories/IClientRepository";


interface IRequestDTO {
  id: string;
}

class ShowClientService {
  constructor(
    private clientRepository: IClientRepository) {}

  public async execute({ id }: IRequestDTO): Promise<Client> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError("Cliente não existe.", 404);
    }

    return client;
  }
}

export default ShowClientService;
