import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IRequestUserDTO from '@modules/users/dtos/IRequestUserDTO';

export default interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  // findUsersActive(name: string): Promise<User[]>;
  // findUserForCity(
  //   name: string,
  //   city: string
  // ): Promise<User[]>;
  findUsers(
    data: IRequestUserDTO
  ): Promise<User[]>;

  create(data: ICreateUsersDTO): Promise<User | undefined>;
  update(id: string, data: IUpdateUserDTO): Promise<User | undefined>;
  updateAvatar(data: IUpdateUserDTO): Promise<User>;

  quantitySellers(id: string): Promise<number>;
}
