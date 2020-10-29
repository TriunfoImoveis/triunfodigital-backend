import { getRepository, Repository } from "typeorm";

import AppError from "@shared/errors/AppError";
import IDepartamentRepository from "@modules/users/repositories/IDepartamentRepository";
import Departament from "@modules/users/infra/typeorm/entities/Departament";
import ICreateDepartamentDTO from "@modules/users/dtos/ICreateDepartamentDTO";
import IUpdateDepartamentDTO from "@modules/users/dtos/IUpdateDepartamentDTO";
import Subsidiary from "@modules/users/infra/typeorm/entities/Subsidiary";

class DepartamentsRepository implements IDepartamentRepository {
  private ormRepository: Repository<Departament>;

  constructor() {
    this.ormRepository = getRepository(Departament);
  }

  async findByName(name: string): Promise<Departament | undefined> {
    const departament = await this.ormRepository.findOne({
      where: {
        name,
      }
    });
    return departament;
  }

  async findByNameAndSubsidiary(
    name: string, subsidiary: Subsidiary
  ): Promise<Departament | undefined> {
    const departament = await this.ormRepository.findOne({
      where: {
        name: name,
        subsidiary: subsidiary
      }
    });
    return departament;
  }

  async findById(id: string): Promise<Departament | undefined> {
    const departament = await this.ormRepository.findOne(id, {
      relations: ['subsidiary']
    });
    return departament;
  }

  async findDepartamentsActive(): Promise<Departament[] | undefined> {
    const departaments = await this.ormRepository.find({
      where: {
        active: true,
      }
    });
    return departaments;
  }

  async create(data: ICreateDepartamentDTO): Promise<Departament | undefined> {
    try {
      const departament = this.ormRepository.create(data);
      const newDepartament = await this.ormRepository.save(departament);

      return newDepartament;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async update(id: string, data: IUpdateDepartamentDTO): Promise<Departament | undefined> {
    await this.ormRepository.update(id, data);
    const departamentUpdated = await this.ormRepository.findOne(id);

    return departamentUpdated;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default DepartamentsRepository;
