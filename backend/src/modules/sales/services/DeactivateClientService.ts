import AppError from '@shared/errors/AppError';
import IClientRepository from "@modules/sales/repositories/IClientRepository";


interface IRequestDTO {
  id: string;
}

class DeactivateClientService {
  constructor(private clientRepository: IClientRepository) {}

  public async execute({ id }: IRequestDTO): Promise<void> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError('Client not exists.');
    }

    await this.clientRepository.deactivate(id);
  }
}

export default DeactivateClientService;
