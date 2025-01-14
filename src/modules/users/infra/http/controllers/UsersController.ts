import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import UploadAvatarUserService from '@modules/users/services/UploadAvatarUserService';
import ListUserService from '@modules/users/services/ListUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import UpdateStatusUserService from '@modules/users/services/UpdateStatusUserService';

class UsersController {
  async index(request: Request, response: Response): Promise<Response> {
    const {
      name,
      subsidiary,
      departament,
      office
    } = request.query;

    if (typeof name !== "string") {
      throw new AppError('Name not is validate string.');
    } else if (typeof subsidiary !== "string") {
      throw new AppError('City not is validate string.');
    } else if (typeof departament !== "string") {
      throw new AppError('Departament not is validate string.');
    } else if (typeof office !== "string") {
      throw new AppError('Office not is validate string.');
    }

    const listUserService = container.resolve(ListUserService);

    const usersList = await listUserService.execute({
      name,
      subsidiary,
      departament,
      office,
    });

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
      creci,
      departament,
      subsidiary,
      office,
      bank_data,
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const newUser = await createUser.execute({
      name,
      email,
      password,
      phone,
      admission_date,
      goal,
      creci,
      departament,
      subsidiary,
      office,
      bank_data,
    });

    return response.json(classToClass(newUser));
  }

  async show(request: Request, response: Response): Promise<Response> {
    const showUserServive = container.resolve(ShowUserService);

    const user = await showUserServive.execute(
      request.params.id
    );

    return response.json(classToClass(user));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const {old_password = ""} = request.body;

    delete request.body.old_password;
    delete request.body.password_confirmation;

    const updateUser = container.resolve(UpdateUserService);

    const updatedUser = await updateUser.execute({
      id: request.params.id,
      old_password: old_password,
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

  async updateStatusUser(request: Request, response: Response): Promise<Response> {
    const updateStatusUserService = container.resolve(UpdateStatusUserService);

    await updateStatusUserService.execute(
      request.params.id
    );

    return response.status(204).send();
  }

  async createBankData(request: Request, response: Response): Promise<Response> {
    const {bank_data} = request.body;
    const {userId} = request.params;

    const updateStatusUserService = container.resolve(UpdateStatusUserService);

    console.log(bank_data);
    console.log(userId);
    // const createBankDataService = container.resolve(UpdateUserService);
    // const user = await createBankDataService.execute({
    //   id,
    //   body: {
    //     bank_data
    //   }
    // });
    return response.json({ok: true});
  }
}

export default UsersController;
