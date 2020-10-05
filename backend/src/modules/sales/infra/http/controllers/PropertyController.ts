import {Request, Response} from 'express';

import AppError from '@shared/errors/AppError';
import PropertiesRepository from '@modules/sales/infra/typeorm/repositories/PropertyRepository';

class PropertyController {

  async index(request: Request, response: Response): Promise<Response> {
    const propertiesRepository = new PropertiesRepository();
    const properties = await propertiesRepository.findAll();

    return response.json(properties);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const propertiesRepository = new PropertiesRepository();
    const property = await propertiesRepository.findById(request.params.id);

    if (!property) {
      throw new AppError('Property Type not exists.');
    }

    return response.json(property);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const propertiesRepository = new PropertiesRepository();
    const newProperty = await propertiesRepository.create({name});

    return response.json(newProperty);
  }
}

export default PropertyController;
