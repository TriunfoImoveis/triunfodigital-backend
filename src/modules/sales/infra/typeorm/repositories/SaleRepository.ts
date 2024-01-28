import { getRepository, Repository, getConnection, Brackets } from "typeorm";

import AppError from '@shared/errors/AppError';
import Sale, { Status } from "@modules/sales/infra/typeorm/entities/Sale";
import ICreateSaleNewDTO from "@modules/sales/dtos/ICreateSaleNewDTO";
import ICreateSaleUsedDTO from "@modules/sales/dtos/ICreateSaleUsedDTO";
import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import IRequestSaleDTO from "@modules/sales/dtos/IRequestSaleDTO";
import INotValidSaleDTO from "@modules/sales/dtos/INotValidSaleDTO";
import IUpdateSaleDTO from "@modules/sales/dtos/IUpdateSaleDTO";
import ICreateInstallmentDTO from "@modules/finances/dtos/ICreateInstallmentDTO";

class SaleRepository implements ISaleRepository {
  private ormRepository: Repository<Sale>;

  constructor() {
    this.ormRepository = getRepository(Sale);
  }

  async findAllWithoutFilters(): Promise<Sale[]> {
    try {
      const sales = await this.ormRepository.createQueryBuilder("sale")
      .select()
      .innerJoinAndSelect("sale.origin", "origin")
      .leftJoinAndSelect("sale.company", "company")
      .innerJoinAndSelect("sale.payment_type", "payment")
      .innerJoinAndSelect("sale.realty", "realty")
      .innerJoinAndSelect("realty.property", "property")
      .leftJoinAndSelect("sale.builder", "builder")
      .leftJoinAndSelect("sale.subsidiary", "subsidiary")
      .innerJoinAndSelect("sale.client_buyer", "client_buyer")
      .leftJoinAndSelect("sale.client_seller", "client_seller")
      .innerJoinAndSelect("sale.users_directors", "directors")
      .leftJoinAndSelect("directors.subsidiary", "directors_subsidiary")
      .leftJoinAndSelect("sale.user_coordinator", "coordinator")
      .leftJoinAndSelect("sale.sale_has_captivators", "captivators")
      .innerJoinAndSelect("sale.sale_has_sellers", "sellers")
      .leftJoinAndSelect("sellers.subsidiary", "sellers_subsidiary")
      .leftJoinAndSelect("sale.motive", "motive")
      .leftJoinAndSelect("sale.installments", "installments")
      .getMany();

      return sales;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findAll(data: IRequestSaleDTO): Promise<Sale[]> {
    try {
      const {name, status, subsidiaryId, month, year} = data;

      const sales = await this.ormRepository.createQueryBuilder("sale")
      .select()
      .innerJoinAndSelect("sale.origin", "origin")
      .leftJoinAndSelect("sale.company", "company")
      .innerJoinAndSelect("sale.payment_type", "payment")
      .innerJoinAndSelect("sale.realty", "realty")
      .innerJoinAndSelect("realty.property", "property")
      .leftJoinAndSelect("sale.builder", "builder")
      .leftJoinAndSelect("sale.subsidiary", "subsidiary")
      .innerJoinAndSelect("sale.client_buyer", "client_buyer")
      .leftJoinAndSelect("sale.client_seller", "client_seller")
      .innerJoinAndSelect("sale.users_directors", "directors")
      .leftJoinAndSelect("directors.subsidiary", "directors_subsidiary")
      .leftJoinAndSelect("sale.user_coordinator", "coordinator")
      .leftJoinAndSelect("sale.sale_has_captivators", "captivators")
      .innerJoinAndSelect("sale.sale_has_sellers", "sellers")
      .leftJoinAndSelect("sellers.subsidiary", "sellers_subsidiary")
      .leftJoinAndSelect("sale.motive", "motive")
      .leftJoinAndSelect("sale.installments", "installments")
      .where(new Brackets(qb => {
        if (status) {
          qb.andWhere('sale.status = :status', { status: status })
        }
        if(subsidiaryId) {
          qb.andWhere('sale.subsidiary IS NOT NULL').andWhere('subsidiary.id = :subsidiaryId', { subsidiaryId: subsidiaryId })
        }

        if (name) {
          qb.andWhere("sellers.name ILIKE :name", { name: name+"%" })
        }

        if (month) {
          qb.andWhere('EXTRACT(MONTH FROM sale.sale_date) = :month', { month: month })
        }
        if (year) {
          qb.andWhere('EXTRACT(YEAR FROM sale.sale_date) = :year', { year: year })
        }
      }))
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
          'subsidiary'
        ],

      });
      return sale;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }


  async createSaleNew(
    data: ICreateSaleNewDTO,
    installments: ICreateInstallmentDTO[]
  ): Promise<Sale | undefined> {
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

        installments.forEach(async (installment)=>{
          installment.sale = newSale;
        });

        await queryRunner.manager.save('Installment', installments);

        await queryRunner.commitTransaction();

        return newSale;

    } catch (err) {

        await queryRunner.rollbackTransaction();
        throw new AppError(err.detail);

    } finally {
        await queryRunner.release();
    }
  }


  async createSaleUsed(
    data: ICreateSaleUsedDTO,
    installments: ICreateInstallmentDTO[]
  ): Promise<Sale | undefined> {
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

        installments.forEach(async (installment)=>{
          installment.sale = newSale;
        });

        await queryRunner.manager.save('Installment', installments);

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
      const sale = await this.ormRepository.findOne(id);
      if (sale) {
        if (body.users_sellers) {
          sale.sale_has_sellers = body.users_sellers;
          delete body.users_sellers;
        }
        if (body.users_captivators) {
          sale.sale_has_captivators = body.users_captivators;
          delete body.users_captivators;
        }
        await this.ormRepository.save(sale);
      }
      if (Object.keys(body).length !== 0) {
        await this.ormRepository.update(id, body);
      }

      const saleupdated = this.ormRepository.findOne(id);

      return saleupdated;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async salesForUserSellers(
    id: string,
    format_date: string,
    date: string
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
          "to_char(sale.sale_date, :format) = :date",
          { format: format_date, date: date }
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

  async salesForUserCaptivators(
    id: string,
    format_date: string,
    date: string
  ): Promise<Sale[]> {
    try {
      const sales = await this.ormRepository.createQueryBuilder("sale")
        .select(["sale.id", "sale.realty_ammount"])
        .innerJoinAndSelect(
          "sale_has_captivators", "captivators",
          "captivators.sale_id = sale.id"
        )
        .innerJoinAndSelect(
          "users", "user",
          "captivators.user_id = user.id"
        )
        .where("user.id = :id_user", { id_user: id })
        .andWhere(
          "to_char(sale.sale_date, :format) = :date",
          { format: format_date, date: date }
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

  async validSignal(id: string, status: Boolean): Promise<void> {
    try {
      await this.ormRepository.update(
        id,
        {
          payment_signal: status
        });
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async salesForDashboard(id: string, date: string): Promise<Sale[]> {
    try {
      const sales = await this.ormRepository.createQueryBuilder("sale")
        .select()
        .innerJoinAndSelect("sale.origin", "origin")
        .leftJoinAndSelect("sale.company", "company")
        .innerJoinAndSelect("sale.payment_type", "payment")
        .innerJoinAndSelect("sale.realty", "realty")
        .innerJoinAndSelect("realty.property", "property")
        .leftJoinAndSelect("sale.builder", "builder")
        .innerJoinAndSelect("sale.client_buyer", "client_buyer")
        .leftJoinAndSelect("sale.client_seller", "client_seller")
        .innerJoinAndSelect("sale.users_directors", "directors")
        .leftJoinAndSelect("sale.user_coordinator", "coordinator")
        .leftJoinAndSelect("sale.sale_has_captivators", "captivators")
        .innerJoinAndSelect("sale.sale_has_sellers", "sellers")
        .leftJoinAndSelect("sale.motive", "motive")
        .leftJoinAndSelect("sale.installments", "installments")
        .innerJoinAndSelect("sale.subsidiary", "subsidiary")
        .where("sellers.id = :id_user", { id_user: id })
        .andWhere(
          "to_char(sale.sale_date, :format) = :date",
          { format: "yyyy", date: date }
        )
        .getMany();

      return sales;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async salesForSubsidiary(
    id_subsidiary: string,
    format_date: string,
    date: string
  ): Promise<Sale[]> {
    try {
      const sales = await this.ormRepository.createQueryBuilder("sale")
        .select()
        .innerJoinAndSelect("sale.origin", "origin")
        .leftJoinAndSelect("sale.company", "company")
        .innerJoinAndSelect("sale.payment_type", "payment")
        .innerJoinAndSelect("sale.realty", "realty")
        .innerJoinAndSelect("realty.property", "property")
        .leftJoinAndSelect("sale.builder", "builder")
        .innerJoinAndSelect("sale.client_buyer", "client_buyer")
        .leftJoinAndSelect("sale.client_seller", "client_seller")
        .innerJoinAndSelect("sale.users_directors", "directors")
        .leftJoinAndSelect("sale.user_coordinator", "coordinator")
        .leftJoinAndSelect("sale.sale_has_captivators", "captivators")
        .innerJoinAndSelect("sale.sale_has_sellers", "sellers")
        .leftJoinAndSelect("sale.motive", "motive")
        .leftJoinAndSelect("sale.installments", "installments")
        .innerJoinAndSelect("sale.subsidiary", "subsidiary")
        .where("subsidiary.id = :id", { id: id_subsidiary })
        .andWhere(
          "to_char(sale.sale_date, :format) = :date",
          { format: format_date, date: date }
        )
        .getMany();

      return sales;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default SaleRepository;
