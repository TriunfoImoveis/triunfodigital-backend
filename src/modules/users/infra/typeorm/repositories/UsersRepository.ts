import { getRepository, Repository } from 'typeorm';

import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import IRequestRankingDTO from '@modules/users/dtos/IRequestRankingDTO';
import Subsidiary from '../entities/Subsidiary';

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findUsersActive(): Promise<User[] | undefined> {
    const users = await this.ormRepository.find({
      where: {
        active: true,
      },
    });

    return users;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id, {
      relations: [
        'office',
        'departament',
        'subsidiary',
      ],
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
      relations: ['office']
    });

    return user;
  }

  async create(data: ICreateUsersDTO): Promise<User | undefined> {
    const user = this.ormRepository.create(data);
    const newUser = await this.ormRepository.save(user);

    return newUser;
  }

  async update(id: string, body: IUpdateUserDTO): Promise<User | undefined> {
    await this.ormRepository.update(id, body);
    const userUpdated = await this.findById(id);

    return userUpdated;
  }

  async updateAvatar(data: IUpdateUserDTO): Promise<User> {
    const user = await this.ormRepository.save(data);

    return user;
  }

  async findForCity(data: IRequestRankingDTO): Promise<User[]> {
    const { city } = data;
    const users = await this.ormRepository.createQueryBuilder()
      .select("user.id").from(User, "user")
      .where(
        "user.office_id = :office",
        { office: "f4903e1b-1c54-4000-a58a-a6b26a522c0e" })
      .andWhere(qb => {
        const subQuery = qb.subQuery()
          .select("subsidiary.id").from(Subsidiary, "subsidiary")
          .where("subsidiary.city = :city", { city: city })
          .getQuery();
        return "user.subsidiary_id IN " + subQuery;
      }).getMany();

    return users;
  }

  async ranking(id: string): Promise<void> {
    const quantSales = await this.ormRepository.findOne({
      relations: ['sales']
    });

    console.log(quantSales);
  }
}

export default UsersRepository;
