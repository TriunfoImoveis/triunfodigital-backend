import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  email: string;
  password: string;
  office: string;
}

interface IUserResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  admission_date: Date;
  goal: number;
}

interface Response {
  userAuth: IUserResponse;
  token: string;
}

class AuthenticateUserService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({
    email,
    password,
    office,
  }: IRequest): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    if (office !== user.office_id) {
      throw new AppError(
        'Incorrect email/password and office combination',
        401,
      );
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const userAuth: IUserResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      admission_date: user.admission_date,
      goal: user.goal,
    };
    return {
      userAuth,
      token,
    };
  }
}

export default AuthenticateUserService;
