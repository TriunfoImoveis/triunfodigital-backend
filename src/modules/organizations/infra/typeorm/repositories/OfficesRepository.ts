import { getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import ICreateOfficeDTO from '@modules/organizations/dtos/ICreateOfficeDTO';
import IUpdateOfficeDTO from '@modules/organizations/dtos/IUpdateOfficeDTO';
import IOfficeRepository from '@modules/organizations/repositories/IOfficeRepository';
import Office from '@modules/organizations/infra/typeorm/entities/Office';

class OfficesRepository implements IOfficeRepository {
  private ormRepository: Repository<Office>;

  constructor() {
    this.ormRepository = getRepository(Office);
  }

  async findOfficesActive(): Promise<Office[]> {
    try {
      const office = await this.ormRepository.find({
        where: {
          active: true,
        },
      });
      return office;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findByName(name: string): Promise<Office | undefined> {
    try {
      const office = await this.ormRepository.findOne({
        where: {
          name,
        },
      });
      return office;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findById(id: string): Promise<Office | undefined> {
    try {
      const office = await this.ormRepository.findOne(id);
      return office;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async create(data: ICreateOfficeDTO): Promise<Office> {
    try {
      const office = this.ormRepository.create(data);
      const newOffice = await this.ormRepository.save(office);
      return newOffice;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async update(office: IUpdateOfficeDTO): Promise<Office> {
    try {
      const officeUpdatted = await this.ormRepository.save(office);
      return officeUpdatted;
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

export default OfficesRepository;
