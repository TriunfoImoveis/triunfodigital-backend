import { Request, Response } from 'express';

import AppError from '@shared/errors/AppError';
import SaleRepository from '@modules/sales/infra/typeorm/repositories/SaleRepository';
import RealtyRepository from '@modules/sales/infra/typeorm/repositories/RealtyRepository';
import CreateRealtyService from '@modules/sales/services/CreateRealtyService';
import ClientsRepository from '@modules/sales/infra/typeorm/repositories/ClientsRepository';
import CreateClientService from '@modules/sales/services/CreateClientService';
import CreateSaleNewService from '@modules/sales/services/CreateSaleNewService';
import { SaleType } from '../../typeorm/entities/Sale';

class SaleController {
  async index(request: Request, response: Response): Promise<Response> {
    const saleRepository = new SaleRepository();
    const sales = await saleRepository.findAll();
    return response.json(sales);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const saleRepository = new SaleRepository();
    const sale = await saleRepository.findById(request.params.id);

    if (!sale) {
      throw new AppError('Sale not exists.');
    }

    return response.json(sale);
  }

  async createNew(request: Request, response: Response): Promise<Response> {
    const {
      sale_date,
      realty_ammount,
      percentage_sale,
      percentage_company,
      commission,
      details_payment,
      bonus,
      observation,
      origin,
      realty,
      builder,
      client_buyer,
      user_captivator,
      user_director,
      user_coordinator,
    } = request.body;

    const realtyRepository = new RealtyRepository();
    const createRealtyService = new CreateRealtyService(realtyRepository);

    const realtyId = await createRealtyService.execute({
      enterprise: realty.enterprise,
      unit: realty.unit,
      state: realty.state,
      city: realty.city,
      neighborhood: realty.neighborhood,
      property: realty.property,
    });

    const clientRepository = new ClientsRepository();
    const createClientService = new CreateClientService(clientRepository);

    const client_buyerId = await createClientService.execute({
      name: client_buyer.name,
      cpf: client_buyer.cpf,
      date_birth: client_buyer.date_birth,
      email: client_buyer.email,
      phone: client_buyer.phone,
      occupation: client_buyer.occupation,
      civil_status: client_buyer.civil_status,
      number_children: client_buyer.number_children,
      gender: client_buyer.gender,
    });

    const saleRepository = new SaleRepository();
    const createSaleNewService = new CreateSaleNewService(saleRepository);

    const sale = await createSaleNewService.execute({
      sale_type: SaleType.N,
      sale_date,
      realty_ammount,
      percentage_sale,
      percentage_company,
      commission,
      details_payment,
      bonus,
      observation,
      origin,
      realty: realtyId,
      builder,
      client_buyer: client_buyerId,
      user_captivator,
      user_director,
      user_coordinator,
    });

    return response.json(sale);
  }

  async createUsed(request: Request, response: Response): Promise<void> {
    const {
      sale_date,
      realty_ammount,
      percentage_sale,
      percentage_company,
      comission,
      details_payment,
      bonus,
      observation,
      origin,
      realty,
      client_buyer,
      client_saller,
      user_captivator,
      user_director,
      user_coordinator,
    } = request.body;
  }
}

export default SaleController;
