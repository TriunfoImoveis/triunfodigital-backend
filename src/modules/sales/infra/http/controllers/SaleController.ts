import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import SaleRepository from '@modules/sales/infra/typeorm/repositories/SaleRepository';
import CreateRealtyService from '@modules/sales/services/CreateRealtyService';
import CreateClientService from '@modules/sales/services/CreateClientService';
import CreateSaleNewService from '@modules/sales/services/CreateSaleNewService';
import CreateSaleUsedService from '@modules/sales/services/CreateSaleUsedService';
import { SaleType, Status } from '@modules/sales/infra/typeorm/entities/Sale';
import ValidSaleService from '@modules/sales/services/ValidSaleService';
import NotValidSaleService from '@modules/sales/services/NotValidSaleService';
import UpdateSaleService from '@modules/sales/services/UpdateSaleService';
import ValidSignalService from '@modules/sales/services/ValidSignalService';
import ShowSaleService from '@modules/sales/services/ShowSaleService';
import ExportSaleService from '@modules/sales/services/ExportSaleService';
import ListSaleService from '@modules/sales/services/ListSaleService';

class SaleController {

  async index(request: Request, response: Response): Promise<Response> {
    const {name, city, status} = request.query;

    const listSaleService = container.resolve(ListSaleService);
    const sales = await listSaleService.execute({
      name: name as string, 
      city: city as string, 
      status: status as string,
    });
    
    return response.json(classToClass(sales));
  }


  async show(request: Request, response: Response): Promise<Response> {
    const showSaleService = container.resolve(ShowSaleService);
    const sale = await showSaleService.execute({
      id: request.params.id
    });

    return response.json(classToClass(sale));
  }


  async createSaleNew(request: Request, response: Response): Promise<Response> {
    const {
      sale_date,
      realty_ammount,
      percentage_sale,
      commission,
      bonus,
      origin,
      payment_type,
      realty,
      builder,
      client_buyer,
      user_coordinator,
      users_directors,
      users_sellers,
      value_signal,
      pay_date_signal,
      installments,
    } = request.body;
    
    const createRealtyService = container.resolve(CreateRealtyService);
    const realtyId = await createRealtyService.execute({
      enterprise: realty.enterprise,
      unit: realty.unit,
      state: realty.state,
      city: realty.city,
      neighborhood: realty.neighborhood,
      property: realty.property,
    });

    const createClientService = container.resolve(CreateClientService);
    const client_buyerId = await createClientService.execute({
      name: client_buyer.name,
      cpf: client_buyer.cpf,
      date_birth: client_buyer.date_birth,
      email: client_buyer.email,
      phone: client_buyer.phone,
      whatsapp: client_buyer.whatsapp,
      occupation: client_buyer.occupation,
      civil_status: client_buyer.civil_status,
      number_children: client_buyer.number_children,
      gender: client_buyer.gender,
    });

    const createSaleNewService = container.resolve(CreateSaleNewService);
    const sale = await createSaleNewService.execute({
      sale_type: SaleType.N,
      sale_date,
      realty_ammount,
      percentage_sale,
      commission,
      bonus,
      origin,
      payment_type,
      realty: realtyId,
      builder,
      client_buyer: client_buyerId,
      user_coordinator,
      users_directors,
      users_sellers,
      value_signal,
      pay_date_signal,
    }, installments);

    return response.json(sale);
  }


  async createSaleUsed(request: Request, response: Response): Promise<Response> {
    const {
      sale_date,
      realty_ammount,
      percentage_sale,
      commission,
      bonus,
      origin,
      payment_type,
      realty,
      client_buyer,
      client_seller,
      user_coordinator,
      users_directors,
      users_captivators,
      users_sellers,
      value_signal,
      pay_date_signal,
      installments,
    } = request.body;

    const createRealtyService = container.resolve(CreateRealtyService);
    const realtyId = await createRealtyService.execute({
      enterprise: realty.enterprise,
      unit: realty.unit,
      state: realty.state,
      city: realty.city,
      neighborhood: realty.neighborhood,
      property: realty.property,
    });

    const createClientService = container.resolve(CreateClientService);
    const client_buyerId = await createClientService.execute({
      name: client_buyer.name,
      cpf: client_buyer.cpf,
      date_birth: client_buyer.date_birth,
      email: client_buyer.email,
      phone: client_buyer.phone,
      whatsapp: client_buyer.whatsapp,
      occupation: client_buyer.occupation,
      civil_status: client_buyer.civil_status,
      number_children: client_buyer.number_children,
      gender: client_buyer.gender,
    });

    const client_sellerId = await createClientService.execute({
      name: client_seller.name,
      cpf: client_seller.cpf,
      date_birth: client_seller.date_birth,
      email: client_seller.email,
      phone: client_seller.phone,
      whatsapp: client_seller.whatsapp,
      occupation: client_seller.occupation,
      civil_status: client_seller.civil_status,
      number_children: client_seller.number_children,
      gender: client_seller.gender,
    });

    const createSaleUsedService = container.resolve(CreateSaleUsedService);
    const sale = await createSaleUsedService.execute({
      sale_type: SaleType.U,
      sale_date,
      realty_ammount,
      percentage_sale,
      commission,
      bonus,
      origin,
      payment_type,
      realty: realtyId,
      client_buyer: client_buyerId,
      client_seller: client_sellerId,
      user_coordinator,
      users_directors,
      users_captivators,
      users_sellers,
      value_signal,
      pay_date_signal,
    }, installments);

    return response.json(sale);
  }

  async validSale(request:Request, response: Response): Promise<Response> {
    const validSaleService = container.resolve(ValidSaleService);
    await validSaleService.execute(
      request.params.id,
    );

    return response.status(204).send();
  }

  async notValidSale(request:Request, response: Response): Promise<Response> {
    const { motive, another_motive } = request.body;

    const notValidSaleService = container.resolve(NotValidSaleService);
    
    await notValidSaleService.execute({
      id: request.params.id,
      status: Status.CA,
      motive,
      another_motive,
    });

    return response.status(200).send();
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateSaleService = container.resolve(UpdateSaleService);
    await updateSaleService.execute({
      id: request.params.id,
      body: request.body
    });

    return response.status(200).send();
  }

  async validSignal(request:Request, response: Response): Promise<Response> {
    const validSignalService = container.resolve(ValidSignalService);
    
    await validSignalService.execute(
      request.params.id,
    );

    return response.status(204).send();
  }

  async exportExcel(request: Request, response: Response): Promise<Response> {
    const exportSaleService = container.resolve(ExportSaleService);
    await exportSaleService.execute();

    return response.send("Arquivo exportado para Excel.");
  }
}

export default SaleController;
