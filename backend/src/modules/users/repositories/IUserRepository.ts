import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

export default interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findUsersActive(): Promise<User[] | undefined>;
  create(data: ICreateUsersDTO): Promise<User>;
  update(id: string, data: IUpdateUserDTO): Promise<User | undefined>;
  updateAvatar(data: IUpdateUserDTO): Promise<User>;
}
