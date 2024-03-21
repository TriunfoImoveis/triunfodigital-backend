import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IRequestUserDTO from '@modules/users/dtos/IRequestUserDTO';

export default interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findUserBySubsidiary(subsidiary: string): Promise<User | undefined>;
  findUsers(
    data: IRequestUserDTO
  ): Promise<User[]>;

  findUsersRealtors(): Promise<User[] | undefined>;
  findUsersRealtorsBySubsidiary(subsidiary: string): Promise<User[] | undefined>;
  findUsersCoordinators(): Promise<User[] | undefined>;
  findUsersCoordinatorsBySubsidiary(subsidiary: string): Promise<User[] | undefined>;
  create(data: ICreateUsersDTO): Promise<User | undefined>;
  save(user: User): Promise<User>;
  update(id: string, data: IUpdateUserDTO): Promise<User | undefined>;
  updateAvatar(data: IUpdateUserDTO): Promise<User>;

  quantitySellers(id_sale: string): Promise<number>;
  quantityCaptivators(id_sale: string): Promise<number>;
}
