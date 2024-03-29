import { inject, injectable } from "tsyringe";

import IRevenueRepository from "@modules/finances/repositories/IRevenueRepository";
import IResponseRevenueDTO from "@modules/finances/dtos/IResponseRevenueDTO";
import IRequestRevenueDTO from "../dtos/IRequestRevenueDTO";

@injectable()
class ListRevenueService {
  constructor (
    @inject('RevenueRepository')
    private revenueRepository: IRevenueRepository,
  ) {}

  public async execute(props: IRequestRevenueDTO): Promise<IResponseRevenueDTO> {
    const {revenues, total, totalValueIntegralRevenues} = await this.revenueRepository.list(props);

    return {revenues, total, totalValueIntegralRevenues};
  }
}

export default ListRevenueService;
