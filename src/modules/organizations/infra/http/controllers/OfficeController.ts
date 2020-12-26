import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOfficeService from '@modules/organizations/services/CreateOfficeService';
import UpdateOfficeService from '@modules/organizations/services/UpdateOfficeService';
import ListOfficeService from '@modules/organizations/services/ListOfficeService';
import ShowOfficeService from '@modules/organizations/services/ShowOfficeService';

class OfficeController {
  async index(request: Request, response: Response): Promise<Response> {
    const listOfficeService = container.resolve(ListOfficeService);

    const officesList = await listOfficeService.execute();

    return response.json(officesList);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const showOfficeService = container.resolve(ShowOfficeService);

    const office = await showOfficeService.execute(
      request.params.id
    );

    return response.json(office);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createOfficeService = container.resolve(CreateOfficeService);

    const newOffice = await createOfficeService.execute({
      name,
    });

    return response.json(newOffice);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateOfficeService = container.resolve(UpdateOfficeService);
    
    const updatedOffice = await updateOfficeService.execute({
      id: request.params.id,
      body: request.body,
    });

    return response.json(updatedOffice);
  }

  // async delete(request: Request, response: Response): Promise<Response> {
  //   const officesRepository = new OfficesRepository();
  //   await officesRepository.delete(request.params.id);

  //   return response.status(204).send();
  // }
}

export default OfficeController;
