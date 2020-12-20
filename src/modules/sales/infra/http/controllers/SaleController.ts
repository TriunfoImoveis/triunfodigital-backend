import { Request, Response } from 'express';

import AppError from '@shared/errors/AppError';
import SaleRepository from '@modules/sales/infra/typeorm/repositories/SaleRepository';
import RealtyRepository from '@modules/sales/infra/typeorm/repositories/RealtyRepository';
import CreateRealtyService from '@modules/sales/services/CreateRealtyService';
import ClientsRepository from '@modules/sales/infra/typeorm/repositories/ClientsRepository';
import CreateClientService from '@modules/sales/services/CreateClientService';
import CreateSaleNewService from '@modules/sales/services/CreateSaleNewService';
import CreateSaleUsedService from '@modules/sales/services/CreateSaleUsedService';
import { SaleType, Status } from '@modules/sales/infra/typeorm/entities/Sale';
import ValidSaleService from '@modules/sales/services/ValidSaleServivce';
import { classToClass } from 'class-transformer';
import NotValidSaleService from '@modules/sales/services/NotValidSaleServivce';
import InstallmentRespository from '@modules/sales/infra/typeorm/repositories/InstallmentRepository';

class SaleController {

  async index(request: Request, response: Response): Promise<Response> {
    const {name, city, status} = request.query;

    if (typeof name != "string") {
      throw new AppError("Name not is valid string");
    } else if (typeof city != "string") {
      throw new AppError("city not is valid string");
    }if (typeof status != "string") {
      throw new AppError("Name not is valid string");
    }

    const saleRepository = new SaleRepository();
    const sales = await saleRepository.findAll({name, city, status});
    return response.json(classToClass(sales));
  }


  async show(request: Request, response: Response): Promise<Response> {
    const saleRepository = new SaleRepository();
    const sale = await saleRepository.findById(request.params.id);

    if (!sale) {
      throw new AppError('Sale not exists.');
    }

    return response.json(classToClass(sale));
  }


  async createSaleNew(request: Request, response: Response): Promise<Response> {
    const {
      sale_date,
      realty_ammount,
      percentage_sale,
      company,
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
      whatsapp: client_buyer.whatsapp,
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
      company,
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
    });

    return response.json(sale);
  }


  async createSaleUsed(request: Request, response: Response): Promise<Response> {
    const {
      sale_date,
      realty_ammount,
      percentage_sale,
      company,
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

    const saleRepository = new SaleRepository();
    const createSaleUsedService = new CreateSaleUsedService(saleRepository);

    const sale = await createSaleUsedService.execute({
      sale_type: SaleType.U,
      sale_date,
      realty_ammount,
      percentage_sale,
      company,
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
    });

    return response.json(sale);
  }

  async validSale(request:Request, response: Response): Promise<Response> {
    const saleRepository = new SaleRepository();
    const installmentRepository = new InstallmentRespository();
    const validSaleService = new ValidSaleService(
      saleRepository, installmentRepository
    );
    
    await validSaleService.execute({
      id: request.params.id,
      installments: request.body.installments,
    });

    return response.status(200).send();
  }

  async notValidSale(request:Request, response: Response): Promise<Response> {
    const { motive, another_motive } = request.body;

    const saleRepository = new SaleRepository();
    const notValidSaleService = new NotValidSaleService(saleRepository);
    
    await notValidSaleService.execute({
      id: request.params.id,
      status: Status.CA,
      motive,
      another_motive,
    });

    return response.status(200).send();
  }
}

export default SaleController;
