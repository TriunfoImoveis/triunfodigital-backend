import { getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import ICreateSubsidiaryDTO from '@modules/organizations/dtos/ICreateSubsidiaryDTO';
import IUpdateOfficeDTO from '@modules/organizations/dtos/IUpdateOfficeDTO';
import ISubsidiaryRepository from '@modules/organizations/repositories/ISubsidiaryRepository';
import Subsidiary from '@modules/organizations/infra/typeorm/entities/Subsidiary';

class SubsidiaryRepository implements ISubsidiaryRepository {
  private ormRepository: Repository<Subsidiary>;

  constructor() {
    this.ormRepository = getRepository(Subsidiary);
  }

  async findByName(name: string): Promise<Subsidiary | undefined> {
    try {
      const subsidiary = await this.ormRepository.findOne({
        where: {
          name,
        },
      });
      return subsidiary;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findById(id: string): Promise<Subsidiary | undefined> {
    try {
      const subsidiary = await this.ormRepository.findOne(id);
      return subsidiary;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findSubsidiarysActive(): Promise<Subsidiary[]> {
    try {
      const subsidiary = await this.ormRepository.find({
        where: {
          active: true,
        },
      });
      return subsidiary;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async create(data: ICreateSubsidiaryDTO): Promise<Subsidiary> {
    try {
      const user = this.ormRepository.create(data);
      const newUser = await this.ormRepository.save(user);

      return newUser;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async update(
    id: string,
    subsidiary: IUpdateOfficeDTO,
  ): Promise<Subsidiary | undefined> {
    try {
      await this.ormRepository.update(id, subsidiary);
      const updatedSubsidiary = await this.ormRepository.findOne(id);

      return updatedSubsidiary;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.ormRepository.delete(id);
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default SubsidiaryRepository;
