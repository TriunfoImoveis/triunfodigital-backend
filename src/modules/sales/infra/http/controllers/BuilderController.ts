import { Request, Response } from 'express';

import CreateBuilderService from '@modules/sales/services/CreateBuilderService';
import BuildersRespository from '@modules/sales/infra/typeorm/repositories/BuildersRepository';
import ShowBuilderService from '@modules/sales/services/ShowBuilderService';
import UpdateBuilderService from '@modules/sales/services/UpdateBuilderService';
import DeactivateBuilderService from '@modules/sales/services/DeactivateBuilderServivce';
import ActivateBuilderService from '@modules/sales/services/ActivateBuilderService';

class BuilderController {

  async index(request: Request, response: Response): Promise<Response> {
    const buildersRepository = new BuildersRespository();
    const builders = await buildersRepository.findBuildersActive();

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

    const buildersRepository = new BuildersRespository();
    const createBuilderService = new CreateBuilderService(buildersRepository);

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
    const buildersRepository = new BuildersRespository();
    const showBuilderService = new ShowBuilderService(buildersRepository);

    const builder = await showBuilderService.execute({
      id: request.params.id,
    });

    return response.json(builder);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const buildersRepository = new BuildersRespository();
    const updateBuilderService = new UpdateBuilderService(buildersRepository);

    const builderUpdated = await updateBuilderService.execute({
      id: request.params.id,
      data: request.body,
    });

    return response.json(builderUpdated);
  }

  async deactivate(request: Request, response: Response): Promise<Response> {
    const buildersRepository = new BuildersRespository();
    const deactivateBuilderService = new DeactivateBuilderService(buildersRepository);

    await deactivateBuilderService.execute({
      id: request.params.id,
    });

    return response.status(204).send();
  }

  async activate(request: Request, response: Response): Promise<Response> {
    const buildersRepository = new BuildersRespository();
    const activateBuilderService = new ActivateBuilderService(buildersRepository);

    const builderActivated = await activateBuilderService.execute({
      id: request.params.id,
    });

    return response.json(builderActivated);
  }
}

export default BuilderController;
