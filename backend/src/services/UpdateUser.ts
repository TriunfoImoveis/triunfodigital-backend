import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import User from '../entities/User';

interface Request {
  user_id: string;
}
class UpdateUser {
  public async excute({ user_id }: Request): Promise<void> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('user not exists', 401);
    }
  }
}

export default UpdateUser;
