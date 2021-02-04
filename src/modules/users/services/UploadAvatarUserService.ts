import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';

interface IRequestDTO {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UploadAvatarUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('StorageProvider')
    private storagePrivider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    avatarFilename,
  }: IRequestDTO): Promise<User | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Usuário não existe.", 404);
    }

    if (user.avatar) {
      await this.storagePrivider.deleteFile(user.avatar);
    }

    const filename = await this.storagePrivider.saveFile(avatarFilename);

    user.avatar = filename;

    const userUpdated = await this.usersRepository.updateAvatar(user);

    return userUpdated;
  }
}

export default UploadAvatarUserService;
