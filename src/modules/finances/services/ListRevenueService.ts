import { inject, injectable } from "tsyringe";
import { isPast, parseISO } from "date-fns";

import IRevenueRepository from "@modules/finances/repositories/IRevenueRepository";
import Revenue, { RevenueStatus } from "@modules/finances/infra/typeorm/entities/Revenue";

@injectable()
class ListRevenueService {
  constructor (
    @inject('RevenueRepository')
    private revenueRepository: IRevenueRepository,
  ) {}

  public async execute(): Promise<Revenue[]> {
    const listRevenue = await this.revenueRepository.list();

    listRevenue.forEach((revenue) => {
      if (revenue.status == RevenueStatus.PEND) {
        const dueDateFormated = parseISO(revenue.due_date.toString());
        if (isPast(dueDateFormated)) {
          revenue.status = RevenueStatus.VENC;
        }
      }
    });
  
    return listRevenue;
  }
}

export default ListRevenueService;