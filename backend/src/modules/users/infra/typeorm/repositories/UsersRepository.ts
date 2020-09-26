import { getRepository, Repository } from 'typeorm';

import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findUsersActive(): Promise<User[] | undefined> {
    const users = await this.ormRepository.find({
      select: [
        'id',
        'name',
        'avatar',
        'email',
        'phone',
        'admission_date',
        'goal',
        'departament_id',
        'office_id',
      ],
      where: {
        active: true,
      },
    });

    return users;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id, {
      select: [
        'id',
        'name',
        'avatar',
        'email',
        'phone',
        'admission_date',
        'goal',
        'departament_id',
        'office_id',
      ]
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  async create(data: ICreateUsersDTO): Promise<User> {
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
}

export default UsersRepository;
