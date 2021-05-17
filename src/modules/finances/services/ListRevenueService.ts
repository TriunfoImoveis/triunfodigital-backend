import { inject, injectable } from "tsyringe";
import { isPast, parseISO } from "date-fns";

import IRevenueRepository from "@modules/finances/repositories/IRevenueRepository";
import { RevenueStatus } from "@modules/finances/infra/typeorm/entities/Revenue";
import calculate_tax_rate from "@shared/utils/calculate_tax_rate";
import IResponseRevenueDTO from "@modules/finances/dtos/IResponseRevenueDTO";

@injectable()
class ListRevenueService {
  constructor (
    @inject('RevenueRepository')
    private revenueRepository: IRevenueRepository,
  ) {}

  public async execute(): Promise<IResponseRevenueDTO[]> {
    const listRevenue = await this.revenueRepository.list();

    listRevenue.map((revenue) => {
      // Colocar status de Vencido
      if (revenue.status == RevenueStatus.PEND) {
        const dueDateFormated = parseISO(revenue.due_date.toString());
        if (isPast(dueDateFormated)) {
          revenue.status = RevenueStatus.VENC;
        }
      }

      // Calculo do valor liquido.
      const value_liquid = calculate_tax_rate(revenue.value_integral, revenue.tax_rate);
      const responseRevenue: IResponseRevenueDTO = revenue;
      responseRevenue.value_liquid = value_liquid;
    });
  
    return listRevenue;
  }
}

export default ListRevenueService;