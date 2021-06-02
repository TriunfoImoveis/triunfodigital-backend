import { inject, injectable } from "tsyringe";
import { add } from "date-fns";

import IUpdateRevenueDTO from "@modules/finances/dtos/IUpdateRevenueDTO";
import IRevenueRepository from "@modules/finances/repositories/IRevenueRepository";
import AppError from "@shared/errors/AppError";
import { RevenueStatus } from "@modules/finances/infra/typeorm/entities/Revenue";

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
      throw new AppError("Receita não existe.", 404);
    } else if (revenueExists.status === RevenueStatus.CANC) {
      throw new AppError("Receita está com status de CANCELADO.", 400);
    } else if (revenueExists.status === RevenueStatus.PAGO) {
      throw new AppError("Receita já está com status de PAGO.", 400);
    }

    if (data.pay_date) {
      data.pay_date = add(data.pay_date, {hours: 3});
    }

    data.status = RevenueStatus.PAGO;

    await this.revenueRepository.update(id, data);
  }
}

export default PaidRevenueService;