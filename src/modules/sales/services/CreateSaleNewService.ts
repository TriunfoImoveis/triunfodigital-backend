import AppError from '@shared/errors/AppError';
import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import ICreateSaleNewDTO from "@modules/sales/dtos/ICreateSaleNewDTO";
import Sale from '@modules/sales/infra/typeorm/entities/Sale';
import CompanyRepository from '@modules/sales/infra/typeorm/repositories/CompanyRepository';

class CreateSaleNewService {
  constructor(private saleRepository: ISaleRepository) {}

  public async execute({
    sale_type,
    sale_date,
    realty_ammount,
    percentage_sale,
    company,
    percentage_company,
    commission,
    bonus,
    origin,
    payment_type,
    realty,
    builder,
    client_buyer,
    user_director,
    user_coordinator,
    users_sellers,
  }: ICreateSaleNewDTO): Promise<Sale> {

    if (company) {
      const companyRepository = new CompanyRepository();
      const percentage = await companyRepository.findOne(company.id);
      if (percentage) {
        percentage_company = percentage.percentage;
      }
    }

    const sale = await this.saleRepository.createSaleNew({
      sale_type,
      sale_date,
      realty_ammount,
      percentage_sale,
      company,
      percentage_company,
      commission,
      bonus,
      origin,
      payment_type,
      realty,
      builder,
      client_buyer,
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
