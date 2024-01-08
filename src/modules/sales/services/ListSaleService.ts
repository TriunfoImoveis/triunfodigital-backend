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

  public async execute({name, city, status}: IRequestSaleDTO): Promise<Sale[]> {

    let listSales = []

    listSales = await this.salesRepository.findAll({
      name,
      city,
      status,
    });

    if (city.length > 0) {
      listSales = listSales.filter(sale => sale.realty.city === city)
    }

    return listSales;
  }
}

export default ListSaleService;
