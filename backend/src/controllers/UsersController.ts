import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../entities/User';

import CreateUserService from '../services/CreateUserService';
import UpdateUser from '../services/UpdateUser';

class UsersController {
  async index(request: Request, response: Response): Promise<Response> {
    const usersRepository = getRepository(User);

    const usersList = await usersRepository.find({
      select: [
        'name',
        'email',
        'phone',
        'admission_date',
        'goal',
        'departament_id',
        'office_id',
      ],
      where: {
        active: true,
      },
    });

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

    const createUser = new CreateUserService();

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

    const updateUser = new UpdateUser();
    const updatedUser = await updateUser.excute({
      user_id: id,
      body: request.body,
    });

    return response.json(updatedUser);
  }
}

export default UsersController;
