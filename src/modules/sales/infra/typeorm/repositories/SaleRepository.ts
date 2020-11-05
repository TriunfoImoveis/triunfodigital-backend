import { getRepository, Repository, getConnection } from "typeorm";

import AppError from '@shared/errors/AppError';
import Sale from "@modules/sales/infra/typeorm/entities/Sale";
import ICreateSaleNewDTO from "@modules/sales/dtos/ICreateSaleNewDTO";
import ICreateSaleUsedDTO from "@modules/sales/dtos/ICreateSaleUsedDTO";
import ISaleRepository from "@modules/sales/repositories/ISaleRepository";

class SaleRepository implements ISaleRepository {
  private ormRepository: Repository<Sale>;

  constructor() {
    this.ormRepository = getRepository(Sale);
  }


  async findAll(): Promise<Sale[]> {
    const sales = await this.ormRepository.find();
    return sales;
  }


  async findById(id: string): Promise<Sale | undefined> {
    const sale = await this.ormRepository.findOne(id, {
      relations: [
        'origin',
        'payment_type',
        'realty',
        'builder',
        'client_buyer',
        'client_seller',
        'user_director',
        'user_coordinator',
        'sale_has_captivators',
        'sale_has_sellers',
      ]
    });
    return sale;
  }


  async createSaleNew(data: ICreateSaleNewDTO): Promise<Sale | undefined> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    const {
      realty,
      client_buyer,
      users_sellers,
    } = data;

    await queryRunner.startTransaction();

    try {

        const realtyId = await queryRunner.manager.save(realty);
        const client_buyerId = await queryRunner.manager.save(client_buyer);

        data.realty = realtyId;
        data.client_buyer = client_buyerId;

        const sale = this.ormRepository.create(data);
        sale.sale_has_sellers = users_sellers;
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


  async createSaleUsed(data: ICreateSaleUsedDTO): Promise<Sale | undefined> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    const {
      realty,
      client_buyer,
      client_seller,
      users_captivators,
      users_sellers,
    } = data;

    await queryRunner.startTransaction();

    try {

        const realtyId = await queryRunner.manager.save(realty);
        const client_buyerId = await queryRunner.manager.save(client_buyer);
        const client_sellerId = await queryRunner.manager.save(client_seller);

        data.realty = realtyId;
        data.client_buyer = client_buyerId;
        data.client_seller = client_sellerId;

        const sale = this.ormRepository.create(data);
        sale.sale_has_captivators = users_captivators;
        sale.sale_has_sellers = users_sellers;
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


  async salesForUserAndYear(id: string, year: number): Promise<Sale[]> {
    try {
      const sales = await this.ormRepository.createQueryBuilder("sale")
        .select(["sale.id", "sale.realty_ammount"])
        .innerJoinAndSelect(
          "sale_has_sellers", "sellers",
          "sellers.sale_id = sale.id"
        )
        .innerJoinAndSelect(
          "users", "user",
          "sellers.user_id = user.id"
        )
        .where("user.id = :id_user", { id_user: id })
        .andWhere("sale.status = :status", { status: "PENDENTE"})
        .getMany();

      return sales;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async salesForUserAndMonthAndYear(
    id: string, month: number, year: number
  ): Promise<void> {
    console.log(year);
    try {
      const sales = await this.ormRepository.createQueryBuilder("sale")
        .select(["sale.id", "sale.realty_ammount"])
        .innerJoinAndSelect(
          "sale_has_sellers", "sellers",
          "sellers.sale_id = sale.id"
        )
        .innerJoinAndSelect(
          "users", "user",
          "sellers.user_id = user.id"
        )
        .where("user.id = :id_user", { id_user: id })
        .andWhere("extract(year from sale.sale_date) = :year", { year: year })
        .andWhere("sale.status = :status", { status: "PENDENTE"})
        .getMany();
      console.log(sales);
      // return sales;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default SaleRepository;
