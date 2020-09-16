import { Request, Response } from 'express';

import UpdateUserService from '@modules/users/services/UpdateOfficeService';
import CreateUserService from '@modules/users/services/CreateOfficeService';
import CreateOfficeService from '@modules/users/services/CreateOfficeService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import OfficesRepository from '../../typeorm/repositories/OfficesRepository';

class OfficeController {
  async index(request: Request, response: Response): Promise<Response> {
    const officesRepository = new OfficesRepository();
    const officesList = await officesRepository.findOfficesActive();

    return response.json(officesList);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
    } = request.body;
    const officesRepository = new OfficesRepository();
    const createOffice = new CreateOfficeService(officesRepository);

    const newOffice = await createOffice.execute({
      name,
    });

    return response.json(newOffice);
  }

  // async update(request: Request, response: Response): Promise<Response> {
  //   const { id } = request.params;
  //   const usersRepository = new UsersRepository();
  //   const updateUser = new UpdateUserService(usersRepository);
  //   const updatedUser = await updateUser.excute({
  //     user_id: id,
  //     body: request.body,
  //   });

    return response.json(updatedUser);
  }
}

export default OfficeController;
