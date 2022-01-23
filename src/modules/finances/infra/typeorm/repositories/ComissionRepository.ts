import { getRepository, Not, Repository } from "typeorm";

import IComissionRepository from "@modules/finances/repositories/IComissionRepository";
import AppError from "@shared/errors/AppError";
import Comission from "@modules/finances/infra/typeorm/entities/Comission";


class ComissionRepository implements IComissionRepository {
  private ormRepository: Repository<Comission>;

  constructor() {
    this.ormRepository = getRepository(Comission);
  }

  async list(): Promise<Comission[]> {
    try {
      const commissions = await this.ormRepository.createQueryBuilder("comission")
        .select()
        .innerJoinAndSelect("comission.user", "user")
        .innerJoinAndSelect("user.subsidiary", "subsidiary")
        .innerJoinAndSelect("comission.calculation", "calculation")
        .innerJoinAndSelect("calculation.bank_data", "bank_data")
        .innerJoinAndSelect("calculation.installment", "installment")
        .innerJoinAndSelect("installment.sale", "sale")
        .innerJoinAndSelect("sale.realty", "realty")
        .where("comission.participant_type <> :participant", {participant: "EMPRESA"})
        .getMany();
        
      return commissions;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findByUser(
    user_id: string,
    date: string,
  ): Promise<Comission[]> {
    try {
      const comissions = await this.ormRepository.createQueryBuilder("comission")
        .select()
        .innerJoinAndSelect("comission.calculation", "calculation")
        .where("comission.user_id = :user_id", {user_id: user_id})
        .andWhere(
          "to_char(calculation.pay_date, :format) = :date",
          { format: "yyyy", date: date }
        )
        .getMany();

      return comissions;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findBySubsidiary(
    subsidiary_id: string,
    date: string,
  ): Promise<Comission[]> {
    try {
      const comissions = await this.ormRepository.createQueryBuilder("comission")
        .select()
        .innerJoinAndSelect("comission.calculation", "calculation")
        .where("comission.subsidiary_id = :subsidiary_id", {subsidiary_id: subsidiary_id})
        .andWhere(
          "to_char(calculation.pay_date, :format) = :date",
          { format: "yyyy", date: date }
        )
        .getMany();

      return comissions;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default ComissionRepository;