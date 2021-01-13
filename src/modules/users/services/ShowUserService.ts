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
        const userExists = await this.usersRepository.findById(id);

        if (!userExists) {
          throw new AppError('Usuário não existe.', 404);
        }

        return userExists;
    }
}

export default ShowUserService;