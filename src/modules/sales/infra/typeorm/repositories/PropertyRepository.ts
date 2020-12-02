import { getRepository, Repository } from "typeorm";

import AppError from '@shared/errors/AppError';
import IPropertyRepository from "@modules/sales/repositories/IPropertyRepository";
import PropertyType from "@modules/sales/infra/typeorm/entities/PropertyType";
import ICreatePropertyDTO from "@modules/sales/dtos/ICreatePropertyDTO";

class PropertiesRepository implements IPropertyRepository {
  private ormRepository: Repository<PropertyType>;

  constructor() {
    this.ormRepository = getRepository(PropertyType);
  }

  async findAll(): Promise<PropertyType[]> {
    try {
      const properties = await this.ormRepository.find({
        order: {
          name: "ASC",
        },
      });

      return properties;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findById(id: string): Promise<PropertyType | undefined> {
    try {
      const property = await this.ormRepository.findOne(id);

      return property;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async create(data: ICreatePropertyDTO): Promise<PropertyType | undefined> {
    try {
      const property = this.ormRepository.create(data);
      const newProperty = await this.ormRepository.save(property);

      return newProperty;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default PropertiesRepository;
