import { inject, injectable } from "tsyringe";

import IUserRepository from "@modules/users/repositories/IUserRepository";
import AppError from "@shared/errors/AppError";
import IUpdateUserDTO from "../dtos/IUpdateUserDTO";

@injectable()
class UpdateStatusUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new AppError('Usuário não existe.', 404);
    }
    
    if (userExists.active) {
      var status = false;
    } else {
      var status = true;
    }

    await this.usersRepository.update(id, {active: status});
  }
}

export default UpdateStatusUserService;