import { getRepository, Repository, getConnection } from "typeorm";

import AppError from '@shared/errors/AppError';
import Sale from "@modules/sales/infra/typeorm/entities/Sale";
import ICreateSaleDTO from "@modules/sales/dtos/ICreateSaleDTO";
import ISaleRepository from "@modules/sales/repositories/ISaleRepository";

class SaleRepository implements ISaleRepository {
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

  async createSaleAndClient(data: ICreateSaleDTO): Promise<Sale | undefined> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    const {realty, client_buyer} = data;

    await queryRunner.startTransaction();

    try {

        const realtyId = await queryRunner.manager.save(realty);
        const Client_buyerId = await queryRunner.manager.save(client_buyer);

        data.realty = realtyId;
        data.client_buyer = Client_buyerId;

        const sale = this.ormRepository.create(data);
        const newSale = await queryRunner.manager.save(sale);

        await queryRunner.commitTransaction();

        return newSale;

    } catch (err) {

        await queryRunner.rollbackTransaction();
        throw new AppError(err);

    } finally {
        await queryRunner.release();
    }
  }
}

export default SaleRepository;
