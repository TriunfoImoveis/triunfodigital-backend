import {Request, Response} from 'express';

import AppError from '@shared/errors/AppError';
import RealtyRepository from "@modules/sales/infra/typeorm/repositories/RealtyRepository";
import CreateRealtyService from '@modules/sales/services/CreateRealtyService';

class RealtyController {
  async index(request: Request, response: Response): Promise<Response> {
    const realtyRepository = new RealtyRepository();
    const realties = await realtyRepository.findAll();

    return response.json(realties);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const realtyRepository = new RealtyRepository();
    const realty = realtyRepository.findById(request.params.id);

    if (!realty) {
      throw new AppError('Realty not exists.');
    }

    return response.json(realty);
  }

  async create(request: Request, response: Response) {
    const {
      enterprise,
      unit,
      state,
      city,
      neighborhood,
      property,
    } = request.body;

    const realtyRepository = new RealtyRepository();
    const createRealtyService = new CreateRealtyService(realtyRepository);

    const newRealty = await createRealtyService.execute({
      enterprise,
      unit,
      state,
      city,
      neighborhood,
      property,
    });

    return response.json(newRealty);
  }
}

export default RealtyController;
