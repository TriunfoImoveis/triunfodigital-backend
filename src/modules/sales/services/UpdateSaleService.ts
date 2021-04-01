import { inject, injectable } from "tsyringe";
import { add } from "date-fns";

import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import IUpdateSaleDTO from "@modules/sales/dtos/IUpdateSaleDTO";
import AppError from "@shared/errors/AppError";
import IRealtyRepository from "@modules/sales/repositories/IRealtyRepository";
import IClientRepository from "@modules/sales/repositories/IClientRepository";
import { Status } from "../infra/typeorm/entities/Sale";

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

    if ((saleExists.status === Status.PT) || (saleExists.status === Status.CA)) {
      throw new AppError(`Venda com o Status de ${saleExists.status} não pode ser atualizada.`, 400);
    }
    
    // Atualizar o imóvel
    if (body.realty) {
      const realty = saleExists.realty;
      await this.realtiesRepository.update(
        realty.id, 
        body.realty
      );
      delete body.realty;
    }

    // Atualizar o cliente comprador
    if (body.client_buyer) {
      if (body.client_buyer.date_birth) {
        const ajusted_date = add(
          body.client_buyer.date_birth, 
          {hours: 3}
        )
        body.client_buyer.date_birth = ajusted_date;
      }

      const client_buyer = saleExists.client_buyer;
      await this.clientsRepository.update(
        client_buyer.id, 
        body.client_buyer
      );
      delete body.client_buyer;
    }

    // Atualizar o cliente vendedor
    if (body.client_seller) {
      if (body.client_seller.date_birth) {
        const ajusted_date = add(
          body.client_seller.date_birth, 
          {hours: 3}
        )
        body.client_seller.date_birth = ajusted_date;
      }

      const client_seller = saleExists.client_seller;
      await this.clientsRepository.update(
        client_seller.id, 
        body.client_seller
      );
      delete body.client_seller;
    }

    // Atualizar a venda
    if (Object.keys(body).length !== 0) {
      if (body.sale_date) {
        const ajusted_date = add(
          body.sale_date, 
          {hours: 3}
        )
        body.sale_date = ajusted_date;
      }
      if (body.pay_date_signal) {
        const ajusted_date = add(
          body.pay_date_signal, 
          {hours: 3}
        )
        body.pay_date_signal = ajusted_date;
      }

      await this.salesRepository.update(id, body);
    }
  }
}

export default UpdateSaleService;