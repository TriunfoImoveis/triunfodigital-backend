import { inject, injectable } from "tsyringe";
import { add } from "date-fns";

import IRevenueRepository from "@modules/finances/repositories/IRevenueRepository";
import Revenue from "@modules/finances/infra/typeorm/entities/Revenue";
import ICreateRevenueDTO from "@modules/finances/dtos/ICreateRevenueDTO";

@injectable()
class CreateRevenueService {
  constructor (
    @inject('RevenueRepository')
    private revenueRepository: IRevenueRepository,
  ) {}

  public async execute(data: ICreateRevenueDTO): Promise<Revenue> {
    data.due_date = data.due_date &&(add(data.due_date, {hours: 3}));

    const newRevenue = await this.revenueRepository.create(data);
  
    return newRevenue;
  }
}

export default CreateRevenueService;