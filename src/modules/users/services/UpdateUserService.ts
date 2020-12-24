import {hash, compare} from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';

interface IRequestDTO {
  id: string;
  old_password?: string;
  body: IUpdateUserDTO;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
    id,
    old_password,
    body
  }: IRequestDTO): Promise<User | undefined> {
    const user = await this.usersRepository.findById(id);

    if (!user) { //Verifica se o usuario existe.
      throw new AppError('User not exists.', 404);
    }

    if (old_password) { // Verifica se a senha antiga é a mesma no banco de dados.
      const passwordMatched = await compare(old_password, user.password);
      if (!passwordMatched) {
        throw new AppError('Incorrect password.', 401);
      }
    }

    if (body.password) { // Faz o hash da nova senha.
      body.password = await hash(body.password, 8);
    }

    const userUpdate = await this.usersRepository.update(id, body);

    return userUpdate;
  }
}

export default UpdateUserService;
