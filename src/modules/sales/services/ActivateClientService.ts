import AppError from '@shared/errors/AppError';
import Client from "@modules/sales/infra/typeorm/entities/Client";
import IClientRepository from "@modules/sales/repositories/IClientRepository";


interface IRequestDTO {
  id: string;
}

class ActivateClientService {
  constructor(private clientRepository: IClientRepository) {}

  public async execute({ id }: IRequestDTO): Promise<Client> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError('Client not exists.');
    }

    const clientActivate = await this.clientRepository.activate(id);

    if (!clientActivate) {
      throw new AppError('Error when activating the client, check your data.');
    }

    return clientActivate;
  }
}

export default ActivateClientService;
