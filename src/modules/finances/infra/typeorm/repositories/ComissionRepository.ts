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
      console.log(commissions);
      return commissions;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default ComissionRepository;