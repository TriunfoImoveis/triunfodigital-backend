import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBuilderService from '@modules/sales/services/CreateBuilderService';
import ShowBuilderService from '@modules/sales/services/ShowBuilderService';
import UpdateBuilderService from '@modules/sales/services/UpdateBuilderService';
import DeactivateBuilderService from '@modules/sales/services/DeactivateBuilderServivce';
import ActivateBuilderService from '@modules/sales/services/ActivateBuilderService';
import ListBuilderService from '@modules/sales/services/ListBuilderService';
import AppError from '@shared/errors/AppError';
import ExportBuilderService from '@modules/sales/services/ExportBuilderService';

class BuilderController {
  async index(request: Request, response: Response): Promise<Response> {
    const {name, uf, city} = request.query;

    if (typeof name != "string") {
      throw new AppError("Nome não é uma string válida.");
    } else if (typeof uf != "string") {
      throw new AppError("Estado não é uma string válida.");
    } else if (typeof city != "string") {
      throw new AppError("Cidade não é uma string válida.");
    }

    const listBuilderService = container.resolve(ListBuilderService);
    const builders = await listBuilderService.execute({
      name,
      uf,
      city
    });

    return response.json(builders);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      cnpj,
      email,
      phone,
      responsible,
      state,
      city,
    } = request.body;

    const createBuilderService = container.resolve(CreateBuilderService);
    const newBuilder = await createBuilderService.execute({
      name,
      cnpj,
      email,
      phone,
      responsible,
      state,
      city,
    });

    return response.json(newBuilder);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const showBuilderService = container.resolve(ShowBuilderService);
    const builder = await showBuilderService.execute({
      id: request.params.id,
    });

    return response.json(builder);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateBuilderService = container.resolve(UpdateBuilderService);
    const builderUpdated = await updateBuilderService.execute({
      id: request.params.id,
      data: request.body,
    });

    return response.json(builderUpdated);
  }

  async deactivate(request: Request, response: Response): Promise<Response> {
    const deactivateBuilderService = container.resolve(DeactivateBuilderService);
    await deactivateBuilderService.execute({
      id: request.params.id,
    });

    return response.status(200).send();
  }

  async activate(request: Request, response: Response): Promise<Response> {
    const activateBuilderService = container.resolve(ActivateBuilderService);
    const builderActivated = await activateBuilderService.execute({
      id: request.params.id,
    });

    return response.json(builderActivated);
  }

  async exportExcel(request: Request, response: Response): Promise<Response> {
    const {uf} = request.query;

    if (typeof uf != "string") {
      throw new AppError("Estado não é uma string válida.");
    }

    const exportBuilderService = container.resolve(ExportBuilderService);
    const link_url = await exportBuilderService.execute({
      uf: uf as string || '',
    });

    return response.status(201).json(link_url);
  }
}

export default BuilderController;
