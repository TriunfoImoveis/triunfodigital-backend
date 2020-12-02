import { getRepository, Like, Repository } from 'typeorm';

import AppError from "@shared/errors/AppError";
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import Subsidiary from '@modules/users/infra/typeorm/entities/Subsidiary';
import Office from '@modules/users/infra/typeorm/entities/Office';
import IRequestUserDTO from '@modules/users/dtos/IRequestUserDTO';

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findById(id: string): Promise<User | undefined> {
    try {
      const user = await this.ormRepository.findOne(id, {
        relations: [
          'office',
          'departament',
          'subsidiary',
        ],
      });

      return user;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.ormRepository.findOne({
        select: [
          "id",
          "name",
          "avatar",
          "email",
          "phone",
          "admission_date",
          "goal",
          "password",
        ],
        where: { email },
        relations: [
          "office",
          "subsidiary",
        ]
      });

      return user;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async create(data: ICreateUsersDTO): Promise<User | undefined> {
    try {
      const user = this.ormRepository.create(data);
      const newUser = await this.ormRepository.save(user);

      return newUser;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async update(id: string, body: IUpdateUserDTO): Promise<User | undefined> {
    try {
      await this.ormRepository.update(id, body);
      const userUpdated = await this.findById(id);

      return userUpdated;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async updateAvatar(data: IUpdateUserDTO): Promise<User> {
    try {
      const user = await this.ormRepository.save(data);

      return user;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findUserForCity(city: string): Promise<User[]> {
    try {
      const users = await this.ormRepository.createQueryBuilder("user")
        .select()
        .innerJoinAndSelect("user.subsidiary", "subsidiary")
        .innerJoinAndSelect("user.office", "office")
        .where("user.active = true")
        .andWhere("subsidiary.city = :city", { city })
        .andWhere("office.name = :office", { office: "Corretor" })
        .orderBy("user.name", "ASC")
        .getMany();

      return users;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findUsers({
    name,
    city,
    departament,
    office,
  }: IRequestUserDTO): Promise<User[]> {
    try {
      const users = await this.ormRepository.createQueryBuilder("user")
        .select()
        .innerJoinAndSelect("user.office", "office")
        .innerJoinAndSelect("user.subsidiary", "subsidiary")
        .innerJoinAndSelect("user.departament", "departament")
        .where("user.active = true")
        .andWhere("user.name ILIKE :name", { name: name+"%" })
        .andWhere("office.name LIKE :office", { office })
        .andWhere("subsidiary.city LIKE :city", { city })
        .andWhere("departament.name LIKE :departament", { departament })
        .orderBy("user.name", "ASC")
        .getMany();

        return users;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async quantitySellers(id: string): Promise<number> {
    try {
      const quantitySellers = await this.ormRepository.createQueryBuilder("user")
        .select("user.id")
        .innerJoinAndSelect(
          "user.sales", "sales",
          "sales_user.sale_id = :sale", { sale: id }
        )
        .getCount();

      return quantitySellers;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default UsersRepository;
