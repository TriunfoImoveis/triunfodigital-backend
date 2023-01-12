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
  async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params?.id;
    const originsRepository = new OriginsRepository();
    await originsRepository.delete(id);

    return response.status(204).send();
  }
}

export default OriginController;
