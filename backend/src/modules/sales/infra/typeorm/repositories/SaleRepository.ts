import { getRepository, Repository } from "typeorm";

import AppError from '@shared/errors/AppError';
import Sale from "@modules/sales/infra/typeorm/entities/Sale";
import ICreateSaleDTO from "@modules/sales/dtos/ICreateSaleDTO";

class SaleRepository {
  private ormRepository: Repository<Sale>;

  constructor() {
    this.ormRepository = getRepository(Sale);
  }

  async findAll(): Promise<Sale[]> {
    const sales = this.ormRepository.find();
    return sales;
  }

  async findById(id: string): Promise<Sale | undefined> {
    const sale = this.ormRepository.findOne(id);
    return sale;
  }

  async create(data: ICreateSaleDTO): Promise<Sale> {
    try {
      const sale = this.ormRepository.create(data);
      const newSale = this.ormRepository.save(sale);
      return newSale;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default SaleRepository;
