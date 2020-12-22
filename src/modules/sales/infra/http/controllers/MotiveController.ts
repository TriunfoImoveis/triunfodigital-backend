import {Request, Response} from 'express';

import MotiveRepository from '@modules/sales/infra/typeorm/repositories/MotiveRepository';

class MotiveController {

  async index(request: Request, response: Response): Promise<Response> {
    const motiveRepository = new MotiveRepository();
    const motives = await motiveRepository.findAll();

    return response.json(motives);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;

    const motiveRepository = new MotiveRepository();
    const newMotive = await motiveRepository.create({ description });

    return response.json(newMotive);
  }
}

export default MotiveController;
