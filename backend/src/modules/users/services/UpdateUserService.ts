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

  public async excute({ user_id, body }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user not exists', 401);
    }

    const userUpdate = await this.usersRepository.update(body);

    return userUpdate;
  }
}

export default UpdateUserService;
