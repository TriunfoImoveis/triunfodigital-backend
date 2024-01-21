import { inject, injectable } from "tsyringe";

import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import IRequestSaleDTO from "@modules/sales/dtos/IRequestSaleDTO";
import Sale from "@modules/sales/infra/typeorm/entities/Sale";

@injectable()
class ListSaleService {
  constructor(
    @inject("SalesRepository")
    private salesRepository: ISaleRepository,
  ) {}

  public async execute({name, status, subsidiaryId, month, year}: IRequestSaleDTO): Promise<Sale[]> {
    const listSales = await this.salesRepository.findAll({
      name,
      status,
      subsidiaryId,
      month,
      year
    });

    return listSales;
  }
}

export default ListSaleService;
