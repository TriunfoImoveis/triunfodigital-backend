import { Request, Response } from 'express';

import CreateOfficeService from '@modules/users/services/CreateOfficeService';
import AppError from '@shared/errors/AppError';
import UpdateOfficeService from '@modules/users/services/UpdateOfficeService';
import OfficesRepository from '../../typeorm/repositories/OfficesRepository';

class OfficeController {
  async index(request: Request, response: Response): Promise<Response> {
    const officesRepository = new OfficesRepository();
    const officesList = await officesRepository.findOfficesActive();

    return response.json(officesList);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const officesRepository = new OfficesRepository();
    const office = await officesRepository.findById(request.params.id);

    if (!office) {
      throw new AppError('Office not exist.');
    }

    return response.json(office);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const officesRepository = new OfficesRepository();
    const createOffice = new CreateOfficeService(officesRepository);

    const newOffice = await createOffice.execute({
      name,
    });

    return response.json(newOffice);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const officesRepository = new OfficesRepository();
    const updateOffice = new UpdateOfficeService(officesRepository);
    const updatedOffice = await updateOffice.execute({
      id,
      body: request.body,
    });

    return response.json(updatedOffice);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const officesRepository = new OfficesRepository();
    await officesRepository.delete(request.params.id);

    return response.status(204).send();
  }
}

export default OfficeController;
