import AppError from '@shared/errors/AppError';
import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import ICreateSaleDTO from "@modules/sales/dtos/ICreateSaleDTO";
import Sale from '../infra/typeorm/entities/Sale';

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
  }: ICreateSaleDTO): Promise<Sale> {
    const {id} = client_buyer;

    console.log(id);

    const sale = await this.saleRepository.createSaleAndClient({
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
    });

    if (!sale) {
      throw new AppError('Error when creating the sale, check your data');
    }

    return sale;
  }
}

export default CreateSaleNewService;
