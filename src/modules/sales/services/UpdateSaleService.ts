import { inject, injectable } from "tsyringe";

import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import IUpdateSaleDTO from "@modules/sales/dtos/IUpdateSaleDTO";
import AppError from "@shared/errors/AppError";
import IRealtyRepository from "@modules/sales/repositories/IRealtyRepository";
import IClientRepository from "@modules/sales/repositories/IClientRepository";

interface IRequestDTO {
  id: string;
  body: IUpdateSaleDTO;
}

@injectable()
class UpdateSaleService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISaleRepository,

    @inject('RealtiesRepository')
    private realtiesRepository: IRealtyRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientRepository,
  ) {}

  public async execute({id, body}: IRequestDTO): Promise<void> {
    const saleExists = await this.salesRepository.findById(id);
    if (!saleExists) {
      throw new AppError("Venda não existe.", 404);
    }
    
    // Atualizar o imóvel
    if (body.realty) {
      const realty = saleExists.realty;
      await this.realtiesRepository.update(
        realty.id, 
        body.realty
      );
    }

    // Atualizar o cliente comprador
    if (body.client_buyer) {
      const client_buyer = saleExists.client_buyer;
      await this.clientsRepository.update(
        client_buyer.id, 
        body.client_buyer
      );
    }
  }
}

export default UpdateSaleService;