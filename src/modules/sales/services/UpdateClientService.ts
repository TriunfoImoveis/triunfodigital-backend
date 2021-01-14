import IUpdateClientDTO from "@modules/sales/dtos/IUpdateClientDTO";
import IClientRepository from "@modules/sales/repositories/IClientRepository";
import AppError from '@shared/errors/AppError';
import Client from "@modules/sales/infra/typeorm/entities/Client";


interface IRequestDTO {
  client_id: string;
  data: IUpdateClientDTO;
}

class UpdateClientService {
 constructor(private clientsRepository: IClientRepository) {}

 public async execute({ client_id, data }: IRequestDTO): Promise<Client> {
  const checkClientExists = await this.clientsRepository.findById(client_id);

  if (!checkClientExists) {
    throw new AppError("Cliente não existe.", 404);
  }

  const clientUpdated = await this.clientsRepository.update(client_id, data);

  if (!clientUpdated) {
    throw new AppError(
      "Erro durante a atualização do cliente, ckeck seus dados",
      400
    );
  }

  return clientUpdated;
 }
}

export default UpdateClientService;
