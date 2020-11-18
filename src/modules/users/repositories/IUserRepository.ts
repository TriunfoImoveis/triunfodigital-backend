import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

export default interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findUsersActive(): Promise<User[]>;
  findUserForCity(city: string): Promise<User[]>;
  findUserForCityAndOffice(
    city: string,
    office: string
  ): Promise<User[]>;

  create(data: ICreateUsersDTO): Promise<User | undefined>;
  update(id: string, data: IUpdateUserDTO): Promise<User | undefined>;
  updateAvatar(data: IUpdateUserDTO): Promise<User>;

  quantitySellers(id: string): Promise<number>;
}
