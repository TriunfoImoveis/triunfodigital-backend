import { getRepository, Repository } from "typeorm";

import AppError from '@shared/errors/AppError';
import IPaymentTypeRepository from "@modules/sales/repositories/IPaymentTypeRepository";
import PaymentType from "@modules/sales/infra/typeorm/entities/PaymentType";
import ICreatePaymentTypeDTO from "@modules/sales/dtos/ICreatePaymentTypeDTO";

class PaymentTypeRepository implements IPaymentTypeRepository {
  private ormRepository: Repository<PaymentType>;

  constructor() {
    this.ormRepository = getRepository(PaymentType);
  }

  async findNewOrUsed(type: string): Promise<PaymentType[]> {
    try {
      const payment_types = await this.ormRepository.find({
        where: { type },
        order: { name: "ASC" },
      });

      return payment_types;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async findById(id: string): Promise<PaymentType | undefined> {
    try {
      const payment_type = await this.ormRepository.findOne(id);

      return payment_type;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }

  async create(data: ICreatePaymentTypeDTO): Promise<PaymentType | undefined> {
    try {
      const payment_type = this.ormRepository.create(data);
      const new_payment_type= await this.ormRepository.save(payment_type);

      return new_payment_type;
    } catch (err) {
      throw new AppError(err.detail);
    }
  }
}

export default PaymentTypeRepository;
