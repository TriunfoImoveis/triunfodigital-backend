import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import ICreateUsersDTO from '../dtos/ICreateUsersDTO';

class CreateUserService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({
    name,
    email,
    password,
    phone,
    admission_date,
    goal,
    departament_id,
    office_id,
  }: ICreateUsersDTO): Promise<User> {
    const checkEmailExist = await this.usersRepository.findByEmail(email);

    if (checkEmailExist) {
      throw new AppError('E-mail address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      goal,
      phone,
      admission_date,
      departament_id,
      office_id,
    });

    if (!user) {
      throw new AppError('error when creating the user, check your data');
    }

    return user || undefined;
  }
}

export default CreateUserService;
