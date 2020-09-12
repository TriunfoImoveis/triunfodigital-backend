import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../errors/AppErrors';

import User from '../entities/User';

interface Request {
  email: string;
  password: string;
  office: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
    office,
  }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    if (office !== user.office_id.name) {
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
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
