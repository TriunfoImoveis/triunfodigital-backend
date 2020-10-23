import { getRepository, Repository } from 'typeorm';

import ICreateOfficeDTO from '@modules/users/dtos/ICreateOfficeDTO';
import IUpdateOfficeDTO from '@modules/users/dtos/IUpdateOfficeDTO';
import IOfficeRepository from '@modules/users/repositories/IOfficeRepository';
import Office from '@modules/users/infra/typeorm/entities/Office';

class OfficesRepository implements IOfficeRepository {
  private ormRepository: Repository<Office>;

  constructor() {
    this.ormRepository = getRepository(Office);
  }

  async findOfficesActive(): Promise<Office[] | undefined> {
    const office = await this.ormRepository.find({
      where: {
        active: true,
      },
    });
    return office;
  }

  async findByName(name: string): Promise<Office | undefined> {
    const office = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return office;
  }

  async findById(id: string): Promise<Office | undefined> {
    const office = await this.ormRepository.findOne(id);
    return office;
  }

  async create(data: ICreateOfficeDTO): Promise<Office> {
    const office = this.ormRepository.create(data);
    const newOffice = await this.ormRepository.save(office);
    return newOffice;
  }

  async update(office: IUpdateOfficeDTO): Promise<Office> {
    const officeUpdatted = await this.ormRepository.save(office);
    return officeUpdatted;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default OfficesRepository;
