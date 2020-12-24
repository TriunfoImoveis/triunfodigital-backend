import { inject, injectable } from "tsyringe";

import User from "@modules/users/infra/typeorm/entities/User";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import IRequestUserDTO from "@modules/users/dtos/IRequestUserDTO";


@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute(data: IRequestUserDTO): Promise<User[]> {

    const users = await this.usersRepository.findUsers(data);

    return users;
  }
}

export default ListUserService;
