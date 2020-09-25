import { Request, Response } from 'express';

import AppError from '@shared/errors/AppError';
import ClientsReository from '@modules/sales/infra/typeorm/repositories/ClientsRepository';


class ClientController {

  async index(request: Request, response: Response): Promise<Response> {
    const clientsRepository = new ClientsReository();
    const clients = await clientsRepository.findClientsActive();

    return response.json(clients);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const clientsRepository = new ClientsReository();
    const client = await clientsRepository.findById(request.params.id);

    if (!client) {
      throw new AppError('Client not exists.');
    }

    return response.json(client);
  }

  async create(request: Request, response: Response): Promise<void> {}

  async update(request: Request, response: Response): Promise<void> {}

  async delete(request: Request, response: Response): Promise<void> {}
}

export default ClientController;
