import { getRepository, Repository } from "typeorm";

import IOriginRepository from "@modules/sales/repositories/IOriginRepository";
import OriginSale from "@modules/sales/infra/typeorm/entities/OriginSale";
import ICreateOriginDTO from "@modules/sales/dtos/ICreateOriginDTO";

class OriginsRepository implements IOriginRepository {
  private ormRepository: Repository<OriginSale>;

  constructor() {
    this.ormRepository = getRepository(OriginSale);
  }

  async findAll(): Promise<OriginSale[]> {
    const origins = await this.ormRepository.find();

    return origins;
  }

  async findById(id: string): Promise<OriginSale | undefined> {
    const origin = await this.ormRepository.findOne(id);

    return origin;
  }

  async create(data: ICreateOriginDTO): Promise<OriginSale | undefined> {
    const origin = this.ormRepository.create(data);
    const newOrigin = await this.ormRepository.save(origin);

    return newOrigin;
  }
}

export default OriginsRepository;
