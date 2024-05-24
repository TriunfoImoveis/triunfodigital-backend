import { Brackets, getRepository, Repository } from 'typeorm';

import AppError from "@shared/errors/AppError";
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/User';
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
          'bank_data',
          'sales',
          'sales.realty',
          'captivators',
          'captivators.realty',
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
          "validated_account",
          "active"
        ],
        where: { email },
        relations: [
          "office",
          "subsidiary",
          "bank_data",
        ]
      });

      return user;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findUserBySubsidiary(subsidiary: string): Promise<User | undefined> {
    try {
      const user = await this.ormRepository.findOne({
        select: [
          "id",
          "name",
          "avatar",
        ],
        where: { subsidiary },
        relations: [
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

  async save(user: User): Promise<User> {
    try {
      const userSaved = await this.ormRepository.save(user);

      return userSaved;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async update(id: string, body: IUpdateUserDTO): Promise<User | undefined> {
    try {
      if (Object.keys(body).length !== 0) {
        await this.ormRepository.update(id, body);
      }
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

  async findUsers(data: IRequestUserDTO): Promise<User[]> {
    try {
      const { name, subsidiary, departament, office } = data;
      const users = await this.ormRepository.createQueryBuilder("user")
        .select()
        .innerJoinAndSelect("user.office", "office")
        .innerJoinAndSelect("user.subsidiary", "subsidiary")
        .innerJoinAndSelect("user.departament", "departament")
        .where("user.active = true")
        .andWhere(new Brackets((qb) => {
          if (name) {
            qb.andWhere("user.name ILIKE :name", { name: name + "%" })
          }
          if (office) {
            qb.andWhere("office.name LIKE :office", { office })
          }
          if (subsidiary) {
            qb.andWhere("subsidiary.id = :subsidiary", { subsidiary })
          }
          if (departament) {
            qb.andWhere("departament.name LIKE :departament", { departament })
          }
        }
        ))
        .orderBy("user.name", "ASC")
        .getMany();

      return users;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findUsersRealtors(): Promise<User[] | undefined> {
    const users = await this.ormRepository.createQueryBuilder("user")
      .select()
      .innerJoinAndSelect("user.office", "office")
      .innerJoinAndSelect("user.subsidiary", "subsidiary")
      .innerJoinAndSelect("user.departament", "departament")
      .where("user.active = true")
      .andWhere("office.name = :office", { office: 'Corretor' })
      .orderBy("user.name", "ASC")
      .getMany();

    return users
  }
  async findUsersRealtorsBySubsidiary(subsidiary: string): Promise<User[] | undefined> {
    const users = await this.ormRepository.createQueryBuilder("user")
      .select()
      .innerJoinAndSelect("user.office", "office")
      .innerJoinAndSelect("user.subsidiary", "subsidiary")
      .innerJoinAndSelect("user.departament", "departament")
      .andWhere("office.name = :office", { office: 'Corretor' })
      .andWhere("subsidiary.id = :subsidiary", { subsidiary })
      .orderBy("user.name", "ASC")
      .getMany();

    return users
  }
  async findUsersCoordinators(): Promise<User[] | undefined> {
    const users = await this.ormRepository.createQueryBuilder("user")
      .select()
      .innerJoinAndSelect("user.office", "office")
      .innerJoinAndSelect("user.subsidiary", "subsidiary")
      .innerJoinAndSelect("user.departament", "departament")
      .where("office.name = :office", { office: 'Coordenador' })
      .orderBy("user.name", "ASC")
      .getMany();

    return users
  }
  async findUsersCoordinatorsBySubsidiary(subsidiary: string): Promise<User[] | undefined> {
    const users = await this.ormRepository.createQueryBuilder("user")
      .select()
      .innerJoinAndSelect("user.office", "office")
      .innerJoinAndSelect("user.subsidiary", "subsidiary")
      .innerJoinAndSelect("user.departament", "departament")
      .where("user.active = true")
      .andWhere("office.name LIKE :office", { office: 'Coordenador' })
      .andWhere("subsidiary.id = :subsidiary", { subsidiary })
      .orderBy("user.name", "ASC")
      .getMany();

    return users
  }
  async quantitySellers(id_sale: string): Promise<number> {
    try {
      const quantitySellers = await this.ormRepository.createQueryBuilder("user")
        .select("user.id")
        .innerJoinAndSelect(
          "user.sales", "sales",
          "sales_user.sale_id = :sale", { sale: id_sale }
        )
        .getCount();
      return quantitySellers;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async quantityCaptivators(id_sale: string): Promise<number> {
    try {
      const quantityCaptivators = await this.ormRepository.createQueryBuilder("user")
        .select("user.id")
        .innerJoinAndSelect(
          "user.captivators", "captivators",
          "captivators_user.sale_id = :sale", { sale: id_sale }
        )
        .getCount();

      return quantityCaptivators;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default UsersRepository;
