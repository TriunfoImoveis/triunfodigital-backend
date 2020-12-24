import { inject, injectable } from "tsyringe";

import AppError from '@shared/errors/AppError';
import IUserRepository from "@modules/users/repositories/IUserRepository";
import User from "@modules/users/infra/typeorm/entities/User";

@injectable()
class ShowUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
    ){}

    public async execute(id: string): Promise<User> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
          throw new AppError('User not exists.', 404);
        }

        return user;
    }
}

export default ShowUserService;