import { inject, injectable } from "tsyringe";

import IRevenueRepository from "@modules/finances/repositories/IRevenueRepository";
import IResponseRevenueDTO from "@modules/finances/dtos/IResponseRevenueDTO";
import IRequestRevenueDTO from "../dtos/IRequestRevenueDTO";
import { RevenueStatus } from "../infra/typeorm/entities/Revenue";

@injectable()
class ListRevenueService {
  constructor (
    @inject('RevenueRepository')
    private revenueRepository: IRevenueRepository,
  ) {}

  public async execute(props: IRequestRevenueDTO): Promise<IResponseRevenueDTO> {

    const {status} = props;

    const isFilterDateByPayDate = status && status.includes(RevenueStatus.PAGO) || false;

    if (isFilterDateByPayDate) {
      const {revenues, total, totalValueIntegralRevenues} = await this.revenueRepository.listAndFilterByPayDate(props);

      return {revenues, total, totalValueIntegralRevenues};
    }

    const {revenues, total, totalValueIntegralRevenues} = await this.revenueRepository.list(props);

    return {revenues, total, totalValueIntegralRevenues};
  }
}

export default ListRevenueService;
