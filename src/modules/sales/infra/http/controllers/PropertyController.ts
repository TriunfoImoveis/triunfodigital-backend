import {Request, Response} from 'express';

import PropertiesRepository from '@modules/sales/infra/typeorm/repositories/PropertyRepository';

class PropertyController {

  async index(request: Request, response: Response): Promise<Response> {
    const propertiesRepository = new PropertiesRepository();
    const properties = await propertiesRepository.findAll();

    return response.json(properties);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const propertiesRepository = new PropertiesRepository();
    const newProperty = await propertiesRepository.create({name});

    return response.json(newProperty);
  }
}

export default PropertyController;
