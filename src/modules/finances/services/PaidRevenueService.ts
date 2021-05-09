import { inject, injectable } from "tsyringe";
import { add } from "date-fns";

import IUpdateRevenueDTO from "@modules/finances/dtos/IUpdateRevenueDTO";
import IRevenueRepository from "@modules/finances/repositories/IRevenueRepository";
import AppError from "@shared/errors/AppError";
import { RevenueStatus } from "../infra/typeorm/entities/Revenue";

interface IRequestDTO {
  id: string;
  data: IUpdateRevenueDTO;
}

@injectable()
class PaidRevenueService {
  constructor(
    @inject('RevenueRepository')
    private revenueRepository: IRevenueRepository,
  ) {}

  public async execute({id, data}: IRequestDTO): Promise<void> {
    const revenueExists = await this.revenueRepository.findById(id);

    if (!revenueExists) {
      throw new AppError("Essa receita não existe.", 404);
    }

    if (data.pay_date) {
      data.pay_date = add(data.pay_date, {hours: 3});
    }

    await this.revenueRepository.update(id, {
      pay_date: data.pay_date,
      bank_data: data.bank_data,
      status: RevenueStatus.PAGO,
    });
  }
}

export default PaidRevenueService;