import { getRepository, Repository } from 'typeorm';

import ICreateSubsidiaryDTO from '@modules/users/dtos/ICreateSubsidiaryDTO';
import IUpdateOfficeDTO from '@modules/users/dtos/IUpdateOfficeDTO';
import ISubsidiaryRepository from '@modules/users/repositories/ISubsidiaryRepository';
import Subsidiary from '@modules/users/infra/typeorm/entities/Subsidiary';

class SubsidiaryRepository implements ISubsidiaryRepository {
  private ormRepository: Repository<Subsidiary>;

  constructor() {
    this.ormRepository = getRepository(Subsidiary);
  }

  async findByName(name: string): Promise<Subsidiary | undefined> {
    const subsidiary = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return subsidiary;
  }

  async findById(id: string): Promise<Subsidiary | undefined> {
    const subsidiary = await this.ormRepository.findOne(id);
    return subsidiary;
  }

  async findSubsidiarysActive(): Promise<Subsidiary[] | undefined> {
    const subsidiary = await this.ormRepository.find({
      where: {
        active: true,
      },
    });
    return subsidiary;
  }

  async create(data: ICreateSubsidiaryDTO): Promise<Subsidiary> {
    const user = this.ormRepository.create(data);
    const newUser = await this.ormRepository.save(user);

    return newUser;
  }

  async update(
    id: string,
    subsidiary: IUpdateOfficeDTO,
  ): Promise<Subsidiary | undefined> {
    await this.ormRepository.update(id, subsidiary);
    const updatedSubsidiary = await this.ormRepository.findOne(id);

    return updatedSubsidiary;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default SubsidiaryRepository;
