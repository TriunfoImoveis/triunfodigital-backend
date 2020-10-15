import AppError from '@shared/errors/AppError';
import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import ICreateSaleDTO from "@modules/sales/dtos/ICreateSaleDTO";
import Sale from '@modules/sales/infra/typeorm/entities/Sale';

class CreateSaleNewService {
  constructor(private saleRepository: ISaleRepository) {}

  public async execute({
    sale_type,
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
    users_sellers,
  }: ICreateSaleDTO): Promise<Sale> {

    const sale = await this.saleRepository.createSaleNew({
      sale_type,
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
      users_sellers,
    });

    if (!sale) {
      throw new AppError('Error when creating the sale, check your data');
    }

    return sale;
  }
}

export default CreateSaleNewService;