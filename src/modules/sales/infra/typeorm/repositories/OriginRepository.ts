import { getRepository, Repository } from "typeorm";

import AppError from '@shared/errors/AppError';
import IOriginRepository from "@modules/sales/repositories/IOriginRepository";
import OriginSale from "@modules/sales/infra/typeorm/entities/OriginSale";
import ICreateOriginDTO from "@modules/sales/dtos/ICreateOriginDTO";
import { response } from "express";

interface UpdateData {
  id: string,
  name: string
}

class OriginsRepository implements IOriginRepository {
  private ormRepository: Repository<OriginSale>;

  constructor() {
    this.ormRepository = getRepository(OriginSale);
  }

  async findAll(): Promise<OriginSale[]> {
    try {
      const origins = await this.ormRepository.find({
        order: {
          name: "ASC",
        },
      });

      return origins;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
  async findAllActive(): Promise<OriginSale[]> {
    try {
      const origins = await this.ormRepository.find({
        where: {
          active: true
        },
        order: {
          name: "ASC",
        },
      });

      return origins;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findById(id: string): Promise<OriginSale | undefined> {
    try {
      const origin = await this.ormRepository.findOne(id);

      return origin;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async create(data: ICreateOriginDTO): Promise<OriginSale | undefined> {
    try {
      const origin = this.ormRepository.create(data);
      const newOrigin = await this.ormRepository.save(origin);

      return newOrigin;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
  async update({id, name}: UpdateData): Promise<OriginSale> {
    try {
      const origin = await this.ormRepository.findOne(id);
      const updateOrigin = {
        ...origin,
        name
      }

      const updatedOrigin = await this.ormRepository.save(updateOrigin);

      return updatedOrigin;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async active(id: string): Promise<void> {
    try {
      const origin = await this.ormRepository.findOne(id);
      const activateOrigin = {
        ...origin,
        active: true
      }

      await this.ormRepository.save(activateOrigin);

      return;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async deactivate(id: string): Promise<void> {
    try {
      const origin = await this.ormRepository.findOne(id);
      const desativatedOrigin = {
        ...origin,
        active: false
      }

      await this.ormRepository.save(desativatedOrigin);

      return;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default OriginsRepository;
