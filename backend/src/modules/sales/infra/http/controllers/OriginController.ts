import { Request, Response } from "express";

import OriginsRepository from "@modules/sales/infra/typeorm/repositories/OriginRepository";

class OriginController {
  async index(request: Request, response: Response): Promise<Response> {
    const originsRepository = new OriginsRepository();
    const origins = await originsRepository.findAll();

    return response.json(origins);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const originsRepository = new OriginsRepository();
    const newOrigin = await originsRepository.create({name});

    return response.json(newOrigin);
  }
}

export default OriginController;
