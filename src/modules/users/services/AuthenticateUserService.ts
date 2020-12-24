import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import { classToClass } from 'class-transformer';

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

interface IResponse {
  userAuth: IUserResponse;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
    email,
    password,
    office,
  }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    if (office !== user.office.id) {
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

    return {
      userAuth: classToClass(user),
      token,
    };
  }
}

export default AuthenticateUserService;
