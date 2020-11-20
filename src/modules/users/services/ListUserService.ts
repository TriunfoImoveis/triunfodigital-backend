import User from "@modules/users/infra/typeorm/entities/User";
import IUserRepository from "@modules/users/repositories/IUserRepository";

interface IRequestUser {
  name: string;
  city: string | undefined;
  office: string | undefined;
}

class ListUserService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({
    name,
    city,
    office
  }: IRequestUser): Promise<User[]> {
    var users: User[];

    if (city) {
      if (office) {
        users = await this.usersRepository.findUserForCityAndOffice(name, city, office);
      } else {
        users = await this.usersRepository.findUserForCity(name, city);
      }
    }else {
      users = await this.usersRepository.findUsersActive(name);
    }

    return users;

  }
}

export default ListUserService;
