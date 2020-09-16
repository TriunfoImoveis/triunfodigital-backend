import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import User from '../entities/User';

interface Request {
  user_id: string;
  body: Object;
}
class UpdateUser {
  public async excute({ user_id, body }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('user not exists', 401);
    }

    const userUpdate = await userRepository.save(body);

    return userUpdate;
  }
}

export default UpdateUser;
