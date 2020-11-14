import User from "@modules/users/infra/typeorm/entities/User";
import IUserRepository from "@modules/users/repositories/IUserRepository";

interface IRequestUser {
  city: string | undefined;
  office: string | undefined;
}

class ListUserService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({ city, office }: IRequestUser): Promise<User[]> {
    var users: User[];

    if (city) {
      if (office) {
        users = await this.usersRepository.findUserForCityAndOffice(city, office);
      } else {
        users = await this.usersRepository.findUserForCity(city);
      }
    }else {
      users = await this.usersRepository.findUsersActive();
    }

    return users;

  }
}

export default ListUserService;
