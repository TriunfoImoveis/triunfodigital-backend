import { getRepository, Like, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import ICreateBuilderDTO from '@modules/sales/dtos/ICreateBuilderDTO';
import IBuilderRepository from '@modules/sales/repositories/IBuilderRepository';
import Builder from '@modules/sales/infra/typeorm/entities/Builder';
import IUpdateBuilderDTO from '@modules/sales/dtos/IUpdateBuilderDTO';
import IRequestBuilderDTO from '@modules/sales/dtos/IRequestBuilderDTO';

class BuildersRespository implements IBuilderRepository {
  private ormRepository: Repository<Builder>;

  constructor() {
    this.ormRepository = getRepository(Builder);
  }

  async findBuildersActive(data: IRequestBuilderDTO): Promise<Builder[]> {
    const {name, uf, city} = data;
    try {
      const builders = await this.ormRepository.find({
        where: {
          name: Like(name+"%"),
          state: uf,
          city: Like(city),
          active: true,
        },
        order: {
          name: "ASC",
        },
        cache: true,
      });

      return builders;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findById(id: string): Promise<Builder | undefined> {
    try {
      const builder = await this.ormRepository.findOne(id);
      return builder;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findByIdAndActivate(id: string): Promise<Builder | undefined> {
    try {
      const builder = await this.ormRepository.findOne(
        id,
        {
          where: { active: true }
        }
      );
      return builder;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findByName(name: string): Promise<Builder | undefined> {
    try {
      const builder = await this.ormRepository.findOne({
        where: { name },
      });
      return builder;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findByCNPJ(cnpj: string): Promise<Builder | undefined> {
    try {
      const builder = await this.ormRepository.findOne({
        where: { cnpj },
      });
      return builder;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async create(data: ICreateBuilderDTO): Promise<Builder | undefined> {
    try {
      const builder = this.ormRepository.create(data);
      const newBuilder = await this.ormRepository.save(builder);

      return newBuilder;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async update(id: string, data: IUpdateBuilderDTO): Promise<Builder | undefined> {
    try {
      await this.ormRepository.update(id, data);
      const builderUpdated = await this.ormRepository.findOne(id);

      return builderUpdated;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async deactivate(id: string): Promise<void> {
    try {
      await this.ormRepository.update(id, {active: false});
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async activate(id: string): Promise<Builder | undefined> {
    try {
      await this.ormRepository.update(id, {active: true});
      const builder = await this.ormRepository.findOne(id);
      return builder;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default BuildersRespository;
