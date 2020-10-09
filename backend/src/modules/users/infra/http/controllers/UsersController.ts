import { Request, Response } from 'express';

import AppError from '@shared/errors/AppError';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UploadAvatarUserService from '@modules/users/services/UploadAvatarUserService';
import DepartamentsRepository from '@modules/users/infra/typeorm/repositories/DepartamentsRepository';
import OfficesRepository from '@modules/users/infra/typeorm/repositories/OfficesRepository';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

class UsersController {
  async index(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const usersList = await usersRepository.findUsersActive();
    return response.json(classToClass(usersList));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      phone,
      admission_date,
      goal,
      departament,
      office,
    } = request.body;

    const departamentsRepository = new DepartamentsRepository();
    const checkDepartamentExists = await departamentsRepository.findById(
      departament,
    );
    if (!checkDepartamentExists) {
      throw new AppError('Departament not exists.');
    }

    const officesRepository = new OfficesRepository();
    const checkOfficeExists = await officesRepository.findById(office);
    if (!checkOfficeExists) {
      throw new AppError('Office not exists.');
    }

    const usersRepository = new UsersRepository();
    const createUser = new CreateUserService(usersRepository);

    const newUser = await createUser.execute({
      name,
      email,
      password,
      phone,
      admission_date,
      goal,
      departament,
      office,
    });

    return response.json(classToClass(newUser));
  }

  async show(request: Request, response: Response): Promise<Response> {
    const userRepository = new UsersRepository();
    const user = await userRepository.findById(request.params.id);

    if (!user) {
      throw new AppError('User not exists.');
    }

    return response.json(classToClass(user));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const usersRepository = new UsersRepository();
    const updateUser = new UpdateUserService(usersRepository);
    const updatedUser = await updateUser.execute({
      user_id: id,
      body: request.body,
    });

    return response.json(classToClass(updatedUser));
  }

  async uploadAvatar(request: Request, response: Response): Promise<Response> {
    const uploadAvatarService = container.resolve(UploadAvatarUserService);

    const user = await uploadAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}

export default UsersController;
