import { inject, injectable } from "tsyringe";
import IRevenueRepository from "@modules/finances/repositories/IRevenueRepository";
import Revenue from "@modules/finances/infra/typeorm/entities/Revenue";
import AppError from "@shared/errors/AppError";


@injectable()
class ShowRevenueService {
  constructor(
    @inject("RevenueRepository")
    private revenueRepository: IRevenueRepository,
  ) {}

  public async execute(id: string): Promise<Revenue> {
    const revenue = await this.revenueRepository.findById(id);

    if (!revenue) {
      throw new AppError("Essa receita não existe.", 404);
    }

    return revenue;
  }
}

export default ShowRevenueService;