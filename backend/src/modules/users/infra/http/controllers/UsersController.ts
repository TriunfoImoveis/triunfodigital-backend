import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

class UsersController {
  async index(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const usersList = await usersRepository.findUsersActive();
    return response.json(usersList);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      phone,
      admission_date,
      goal,
      departament_id,
      office_id,
    } = request.body;
    const usersRepository = new UsersRepository();
    const createUser = new CreateUserService(usersRepository);

    const newUser = await createUser.execute({
      name,
      email,
      password,
      phone,
      admission_date,
      goal,
      departament_id,
      office_id,
    });

    return response.json(newUser);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const usersRepository = new UsersRepository();
    const updateUser = new UpdateUserService(usersRepository);
    const updatedUser = await updateUser.excute({
      user_id: id,
      body: request.body,
    });

    return response.json(updatedUser);
  }
}

export default UsersController;
