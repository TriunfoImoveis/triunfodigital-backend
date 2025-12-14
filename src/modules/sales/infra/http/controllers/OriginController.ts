import { Request, Response } from "express";

import OriginsRepository from "@modules/sales/infra/typeorm/repositories/OriginRepository";

class OriginController {
  async index(request: Request, response: Response): Promise<Response> {
    const originsRepository = new OriginsRepository();

    const parseBool = (value: unknown): boolean | undefined => {
      if (typeof value === 'boolean') return value;
      if (typeof value === 'string') return value.toLowerCase() === 'true';
      return undefined;
    };

    const clientFilter = parseBool(request.query.client);
    const channelFilter = parseBool(request.query.channel);

    const origins = await originsRepository.findAllActive({
      isOriginClient: clientFilter,
      isOriginChannel: channelFilter,
    });

    return response.json(origins);
  }

  async showAll(request: Request, response: Response): Promise<Response> {
    const originsRepository = new OriginsRepository();
    const origins = await originsRepository.findAll();

    return response.json(origins);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      isOriginClient = false,
      isOriginChannel = false
    } = request.body;
    const originsRepository = new OriginsRepository();
    const newOrigin = await originsRepository.create({
      name,
      isOriginClient,
      isOriginChannel
    });

    return response.json(newOrigin);
  }
  async update(request: Request, response: Response): Promise<Response> {
    const {id} = request.params;
    const {
      name,
      isOriginClient = false,
      isOriginChannel = false
    } = request.body;
    const originsRepository = new OriginsRepository();
    const updated = await originsRepository.update({
      id,
      name,
      isOriginClient,
      isOriginChannel
    });

    return response.json(updated);
  }
  async activate(request: Request, response: Response): Promise<Response> {
    const {id} = request.params;
    const originsRepository = new OriginsRepository();
    await originsRepository.active(id);

    return response.status(204).send();
  }
  async deactivate(request: Request, response: Response): Promise<Response> {
    const {id} = request.params;
    const originsRepository = new OriginsRepository();
    await originsRepository.deactivate(id);

    return response.status(204).send();
  }
}

export default OriginController;

