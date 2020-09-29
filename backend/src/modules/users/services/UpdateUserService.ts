import AppError from '@shared/errors/AppError';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';

interface IRequest {
  user_id: string;
  body: IUpdateUserDTO;
}

class UpdateUserService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({ user_id, body }: IRequest): Promise<User | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not exists.', 401);
    }

    const userUpdate = await this.usersRepository.update(user_id, body);

    return userUpdate;
  }
}

export default UpdateUserService;
