import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';

import User from '../entities/User';

interface Request {
  email: string;
  password: string;
  office: string;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  admission_date: Date;
  goal: number;
}

interface Response {
  userAuth: UserResponse;
  token: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
    office,
  }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

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

    const userAuth: UserResponse = {
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
