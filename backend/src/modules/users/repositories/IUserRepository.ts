import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUsersDTO from '../dtos/ICreateUsersDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

export default interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findUsersActive(): Promise<User[] | undefined>;
  create(data: ICreateUsersDTO): Promise<User>;
  update(user: IUpdateUserDTO): Promise<User>;
}
