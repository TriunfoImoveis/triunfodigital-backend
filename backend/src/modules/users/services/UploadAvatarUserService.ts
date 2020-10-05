import path from 'path';
import fs from 'fs';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import { classToClass } from 'class-transformer';

interface IRequestDTO {
  user_id: string;
  avatarFilename: string;
}

class UploadAvatarUserService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({
    user_id,
    avatarFilename,
  }: IRequestDTO): Promise<User | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    const userUpdated = await this.usersRepository.updateAvatar(user);

    return userUpdated;
  }
}

export default UploadAvatarUserService;
