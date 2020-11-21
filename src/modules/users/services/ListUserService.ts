import User from "@modules/users/infra/typeorm/entities/User";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import IRequestUserDTO from "@modules/users/dtos/IRequestUserDTO";


class ListUserService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute(data: IRequestUserDTO): Promise<User[]> {

    const users = await this.usersRepository.findUsers(data);

    return users;

  }
}

export default ListUserService;
