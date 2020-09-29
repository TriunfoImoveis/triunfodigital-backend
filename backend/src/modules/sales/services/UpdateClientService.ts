import IUpdateClientDTO from "@modules/sales/dtos/IUpdateClientDTO";
import IClientRepository from "@modules/sales/repositories/IClientRepository";
import AppError from '@shared/errors/AppError';
import Client from "@modules/sales/infra/typeorm/entities/Client";


interface IRequestDTO {
  id: string;
  data: IUpdateClientDTO;
}

class UpdateClientService {
 constructor(private clientsRepository: IClientRepository) {}

 public async execute({ id, data }: IRequestDTO): Promise<Client> {
  const checkClientExists = await this.clientsRepository.findById(id);

  if (!checkClientExists) {
    throw new AppError('Client not exists.');
  }

  const clientUpdated = await this.clientsRepository.update(id, data);

  if (!clientUpdated) {
    throw new AppError('Error when updating the client, check your data');
  }

  return clientUpdated;
 }
}

export default UpdateClientService;
