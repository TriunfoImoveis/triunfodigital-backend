import { Request, Response } from "express";

import AppError from "@shared/errors/AppError";
import OriginsRepository from "@modules/sales/infra/typeorm/repositories/OriginRepository";

class OriginController {
  async index(request: Request, response: Response): Promise<Response> {
    const originsRepository = new OriginsRepository();
    const origins = await originsRepository.findAll();

    return response.json(origins);
  }

  async show(request: Request, response:Response): Promise<Response> {
    const originsRepository = new OriginsRepository();
    const origin = await originsRepository.findById(request.params.id);

    if (!origin) {
      throw new AppError('Origin Sale not exists.');
    }

    return response.json(origin);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const originsRepository = new OriginsRepository();
    const newOrigin = await originsRepository.create({name});

    return response.json(newOrigin);
  }
}

export default OriginController;
