import { inject, injectable } from "tsyringe";

import IRevenueRepository from "@modules/finances/repositories/IRevenueRepository";
import AppError from "@shared/errors/AppError";
import calculate_tax_rate from "@shared/utils/calculate_tax_rate";
import IResponseRevenueDTO from "@modules/finances/dtos/IResponseRevenueDTO";


@injectable()
class ShowRevenueService {
  constructor(
    @inject("RevenueRepository")
    private revenueRepository: IRevenueRepository,
  ) {}

  public async execute(id: string): Promise<IResponseRevenueDTO> {
    const revenue = await this.revenueRepository.findById(id);

    if (!revenue) {
      throw new AppError("Essa receita não existe.", 404);
    }

    const value_liquid = calculate_tax_rate(revenue.value_integral, revenue.tax_rate);
    revenue.value_liquid = value_liquid;
    return revenue;
  }
}

export default ShowRevenueService;