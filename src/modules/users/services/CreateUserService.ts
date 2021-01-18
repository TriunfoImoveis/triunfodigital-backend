import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';


@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
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
  }: ICreateUsersDTO): Promise<User> {
    const checkEmailExist = await this.usersRepository.findByEmail(email);

    if (checkEmailExist) {
      throw new AppError(
        "Endereço de e-mail já usado.", 
        400
      );
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      goal,
      creci,
      phone,
      admission_date,
      departament,
      subsidiary,
      office,
    });

    if (!user) {
      throw new AppError(
        "Erro ao criar o usuário, check seus dados e tente novamente.", 
        400
      );
    }

    return user;
  }
}

export default CreateUserService;
