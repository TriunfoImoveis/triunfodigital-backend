import { inject, injectable } from "tsyringe";

import User from "@modules/users/infra/typeorm/entities/User";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import IRequestUserDTO from "@modules/users/dtos/IRequestUserDTO";


@injectable()
class ListAllUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute(data: IRequestUserDTO): Promise<User[]> {

    const users = await this.usersRepository.findAllUsers(data);

    return users;
  }
}

export default ListAllUserService;
