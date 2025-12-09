import { Request, Response } from 'express';

import AppError from '@shared/errors/AppError';
import ClientsRepository from '@modules/sales/infra/typeorm/repositories/ClientsRepository';
import ShowClientService from '@modules/sales/services/ShowClientService';
import CreateClientService from '@modules/sales/services/CreateClientService';
import UpdateClientService from '@modules/sales/services/UpdateClientService';
import DeactivateClientService from '@modules/sales/services/DeactivateClientService';
import ActivateClientService from '@modules/sales/services/ActivateClientService';
import ListClientService from '@modules/sales/services/ListClientService';


class ClientController {

  async index(request: Request, response: Response): Promise<Response> {
    const {cpf, cnpj} = request.query;

    if ((typeof cpf !== 'string') && (typeof cpf !== 'undefined')){
      throw new AppError("CPF not is valid string.");
    } else if ((typeof cnpj !== 'string') && (typeof cnpj !== 'undefined')){
      throw new AppError("CPF not is valid string.");
    }

    const clientsRepository = new ClientsRepository();
    const listClientService = new ListClientService(clientsRepository);

    const clients = await listClientService.execute({
      cpf,
      cnpj,
    });

    return response.json(clients);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const clientsRepository = new ClientsRepository();
    const showClientServivce = new ShowClientService(clientsRepository);

    const client = await showClientServivce.execute({
      id: request.params.id,
    });

    return response.json(client);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      cpf,
      date_birth,
      email,
      phone,
      profession_id,
      civil_status,
      number_children,
      gender,
      origin_id,
    } = request.body;

    const clientsRepository = new ClientsRepository();
    const createClientService = new CreateClientService(clientsRepository);

    const newClient = await createClientService.execute({
      name,
      cpf,
      date_birth,
      email,
      phone,
      profession_id,
      civil_status,
      number_children,
      gender,
      origin_id,
    });

    return response.json(newClient);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const clientsRepository = new ClientsRepository();
    const updateClientService = new UpdateClientService(clientsRepository);
    const updatedClient = await updateClientService.execute({
      client_id: id,
      data: request.body,
    });

    return response.json(updatedClient);
  }

  async deactivate(request: Request, response: Response): Promise<Response> {
    const clientsRepository = new ClientsRepository();
    const deactivateClientServivce = new DeactivateClientService(clientsRepository);

    await deactivateClientServivce.execute({
      id: request.params.id,
    });

    return response.status(204).send();
  }

  async activate(request: Request, response: Response): Promise<Response> {
    const clientsRepository = new ClientsRepository();
    const activateClientService = new ActivateClientService(clientsRepository);

    const client = await activateClientService.execute({
      id: request.params.id,
    });

    return response.json(client);
  }
}

export default ClientController;
