import { getRepository, Repository, getConnection } from "typeorm";

import AppError from '@shared/errors/AppError';
import Sale, { Status } from "@modules/sales/infra/typeorm/entities/Sale";
import ICreateSaleNewDTO from "@modules/sales/dtos/ICreateSaleNewDTO";
import ICreateSaleUsedDTO from "@modules/sales/dtos/ICreateSaleUsedDTO";
import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import IRequestSaleDTO from "@modules/sales/dtos/IRequestSaleDTO";
import INotValidSaleDTO from "@modules/sales/dtos/INotValidSaleDTO";
import IUpdateSaleDTO from "@modules/sales/dtos/IUpdateSaleDTO";

class SaleRepository implements ISaleRepository {
  private ormRepository: Repository<Sale>;

  constructor() {
    this.ormRepository = getRepository(Sale);
  }

  async findAll(data: IRequestSaleDTO): Promise<Sale[]> {
    try {
      const {name, city, status} = data;

      const sales = await this.ormRepository.createQueryBuilder("sale")
      .select()
      .innerJoinAndSelect("sale.origin", "origin")
      .leftJoinAndSelect("sale.company", "company")
      .innerJoinAndSelect("sale.payment_type", "payment")
      .innerJoinAndSelect("sale.realty", "realty")
      .leftJoinAndSelect("sale.builder", "builder")
      .innerJoinAndSelect("sale.client_buyer", "client_buyer")
      .leftJoinAndSelect("sale.client_seller", "client_seller")
      .innerJoinAndSelect("sale.users_directors", "directors")
      .leftJoinAndSelect("sale.user_coordinator", "coordinator")
      .leftJoinAndSelect("sale.sale_has_captivators", "captivators")
      .innerJoinAndSelect("sale.sale_has_sellers", "sellers")
      .leftJoinAndSelect("sale.motive", "motive")
      .leftJoinAndSelect("sale.installments", "installments")
      .innerJoinAndSelect(
        "sellers.subsidiary", "subsidiary", "subsidiary.city = :city", { city }
      )
      .where("sale.status = :status", { status })
      .andWhere("sellers.name ILIKE :name", { name: name+"%" })
      .orderBy("sale.sale_date", "DESC")
      .getMany();

      return sales;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }


  async findById(id: string): Promise<Sale | undefined> {
    try {
      const sale = await this.ormRepository.findOne(id, {
        relations: [
          'origin',
          'company',
          'payment_type',
          'realty',
          'builder',
          'client_buyer',
          'client_seller',
          'user_coordinator',
          'users_directors',
          'sale_has_captivators',
          'sale_has_sellers',
          'motive',
          'installments',
        ]
      });
      return sale;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }


  async createSaleNew(data: ICreateSaleNewDTO): Promise<Sale | undefined> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    const {
      realty,
      client_buyer,
      users_directors,
      users_sellers,
    } = data;

    await queryRunner.startTransaction();

    try {

        const realtyId = await queryRunner.manager.save(realty);
        const client_buyerId = await queryRunner.manager.save(client_buyer);

        data.realty = realtyId;
        data.client_buyer = client_buyerId;

        const sale = this.ormRepository.create(data);
        sale.users_directors = users_directors;
        sale.sale_has_sellers = users_sellers;
        const newSale = await queryRunner.manager.save(sale);

        await queryRunner.commitTransaction();

        return newSale;

    } catch (err) {

        await queryRunner.rollbackTransaction();
        throw new AppError(err.detail);

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
      users_directors,
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
        sale.users_directors = users_directors;
        sale.sale_has_captivators = users_captivators;
        sale.sale_has_sellers = users_sellers;
        const newSale = await queryRunner.manager.save(sale);

        await queryRunner.commitTransaction();

        return newSale;

    } catch (err) {

        await queryRunner.rollbackTransaction();
        throw new AppError(err.detail);

    } finally {
        await queryRunner.release();
    }
  }

  async update(id: string, body: IUpdateSaleDTO): Promise<Sale | undefined> {
    try {
      await this.ormRepository.update(id, body);
      const sale = this.ormRepository.findOne(id);

      return sale;
    } catch (err) {
      throw new AppError(err.detail);
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
        .andWhere(
          "extract(year from sale.sale_date) = :year",
          { year: year }
        )
        .andWhere(
          "sale.status IN (:...status)",
          { status: ["PENDENTE", "PAGO_TOTAL"] }
        )
        .getMany();

      return sales;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async salesForUserAndMonthAndYear(
    id: string, month: number, year: number
  ): Promise<Sale[]> {
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
        .andWhere(
          "extract(year from sale.sale_date) = :year",
          { year: year }
        )
        .andWhere(
          "extract(month from sale.sale_date) = :month",
          { month: month }
        )
        .andWhere(
          "sale.status IN (:...status)",
          { status: ["PENDENTE", "PAGO_TOTAL"] }
        )
        .getMany();

      return sales;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async validSale(
    id: string, 
    status: Status
  ): Promise<void> {
    try {
      await this.ormRepository.update(id, {status});
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async notValidSale(data: INotValidSaleDTO): Promise<void> {
    const {
      id,
      status,
      motive,
      another_motive,
    } = data;
    try {
      await this.ormRepository.update(id, { 
        status,
        motive,
        another_motive,
      });
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default SaleRepository;
