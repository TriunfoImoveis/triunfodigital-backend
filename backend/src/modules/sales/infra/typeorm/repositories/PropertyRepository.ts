import { getRepository, Repository } from "typeorm";

import IPropertyRepository from "@modules/sales/repositories/IPropertyRepository";
import PropertyType from "@modules/sales/infra/typeorm/entities/PropertyType";
import ICreatePropertyDTO from "@modules/sales/dtos/ICreatePropertyDTO";

class PropertiesRepository implements IPropertyRepository {
  private ormRepository: Repository<PropertyType>;

  constructor() {
    this.ormRepository = getRepository(PropertyType);
  }

  async findAll(): Promise<PropertyType[]> {
    const properties = await this.ormRepository.find({
      order: {
        name: "ASC",
      },
    });

    return properties;
  }

  async findById(id: string): Promise<PropertyType | undefined> {
    const property = await this.ormRepository.findOne(id);

    return property;
  }

  async create(data: ICreatePropertyDTO): Promise<PropertyType | undefined> {
    const property = this.ormRepository.create(data);
    const newProperty = await this.ormRepository.save(property);

    return newProperty;
  }
}

export default PropertiesRepository;
