import { Request, Response } from 'express';

import CreateBuilderService from '@modules/sales/services/CreateBuilderService';
import BuildersRespository from '@modules/sales/infra/typeorm/repositories/BuildersRepository';

class BuilderController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      cnpj,
      email,
      phone,
      responsible,
    } = request.body;

    const buildersRepository = new BuildersRespository();
    const createBuilderService = new CreateBuilderService(buildersRepository);

    const newBuilder = await createBuilderService.execute({
      name,
      cnpj,
      email,
      phone,
      responsible,
    });

    return response.json(newBuilder);
  }
}

export default BuilderController;
