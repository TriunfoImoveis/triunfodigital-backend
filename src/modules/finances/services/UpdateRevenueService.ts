import { inject, injectable } from "tsyringe";
import { add } from "date-fns";

import IUpdateRevenueDTO from "@modules/finances/dtos/IUpdateRevenueDTO";
import IRevenueRepository from "@modules/finances/repositories/IRevenueRepository";
import AppError from "@shared/errors/AppError";

interface IRequestDTO {
  id: string;
  data: IUpdateRevenueDTO;
}

@injectable()
class UpdateRevenueService {
  constructor(
    @inject('RevenueRepository')
    private revenueRepository: IRevenueRepository,
  ) {}

  public async execute({id, data}: IRequestDTO): Promise<void> {
    const revenueExists = await this.revenueRepository.findById(id);

    if (!revenueExists) {
      throw new AppError("Essa receita não existe.", 404);
    }

    if (data.due_date) {
      data.due_date = add(data.due_date, {hours: 3});
    }

    await this.revenueRepository.update(id, data);
  }
}

export default UpdateRevenueService;