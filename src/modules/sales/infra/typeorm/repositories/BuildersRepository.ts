import { getRepository, Repository } from 'typeorm';

import ICreateBuilderDTO from '@modules/sales/dtos/ICreateBuilderDTO';
import IBuilderRepository from '@modules/sales/repositories/IBuilderRepository';
import Builder from '@modules/sales/infra/typeorm/entities/Builder';
import IUpdateBuilderDTO from '@modules/sales/dtos/IUpdateBuilderDTO';

class BuildersRespository implements IBuilderRepository {
  private ormRepository: Repository<Builder>;

  constructor() {
    this.ormRepository = getRepository(Builder);
  }

  async findById(id: string): Promise<Builder | undefined> {
    const builder = await this.ormRepository.findOne(id);
    return builder;
  }

  async findByIdAndActivate(id: string): Promise<Builder | undefined> {
    const builder = await this.ormRepository.findOne(
      id,
      {
        where: { active: true }
      }
    );
    return builder;
  }

  async findByName(name: string): Promise<Builder | undefined> {
    const builder = await this.ormRepository.findOne({
      where: { name },
    });
    return builder;
  }

  async findByCNPJ(cnpj: string): Promise<Builder | undefined> {
    const builder = await this.ormRepository.findOne({
      where: { cnpj },
    });
    return builder;
  }

  async findBuildersActive(): Promise<Builder[]> {
    const builders = await this.ormRepository.find({
      where: {
        active: true,
      }
    });

    return builders;
  }

  async create(data: ICreateBuilderDTO): Promise<Builder | undefined> {
    const builder = this.ormRepository.create(data);
    const newBuilder = await this.ormRepository.save(builder);

    return newBuilder;
  }

  async update(id: string, data: IUpdateBuilderDTO): Promise<Builder | undefined> {
    await this.ormRepository.update(id, data);
    const builderUpdated = await this.ormRepository.findOne(id);

    return builderUpdated;
  }

  async deactivate(id: string): Promise<void> {
    await this.ormRepository.update(id, {active: false});
  }

  async activate(id: string): Promise<Builder | undefined> {
    await this.ormRepository.update(id, {active: true});
    const builder = await this.ormRepository.findOne(id);
    return builder;
  }
}

export default BuildersRespository;
