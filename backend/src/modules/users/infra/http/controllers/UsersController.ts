import { Request, Response } from 'express';

import AppError from '@shared/errors/AppError';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UploadAvatarUserService from '@modules/users/services/UploadAvatarUserService';


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

  async show(request: Request, response: Response): Promise<Response> {
    const userRepository = new UsersRepository();
    const user = await userRepository.findById(request.params.id);

    if (!user) {
      throw new AppError('User not exists.');
    }

    return response.json(user);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const usersRepository = new UsersRepository();
    const updateUser = new UpdateUserService(usersRepository);
    const updatedUser = await updateUser.execute({
      user_id: id,
      body: request.body,
    });

    return response.json(updatedUser);
  }

  async uploadAvatar(request: Request, response: Response): Promise<Response> {
    const userRepository = new UsersRepository();
    const uploadAvatarService = new UploadAvatarUserService(userRepository);

    await uploadAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.status(200).send();
  }
}

export default UsersController;
