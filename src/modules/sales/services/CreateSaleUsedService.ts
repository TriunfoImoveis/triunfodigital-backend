import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import ICreateSaleUsedDTO from "@modules/sales/dtos/ICreateSaleUsedDTO";
import AppError from "@shared/errors/AppError";
import Sale from "@modules/sales/infra/typeorm/entities/Sale";
import CompanyRepository from "@modules/sales/infra/typeorm/repositories/CompanyRepository";

class CreateSaleUsedService {
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
    client_buyer,
    client_seller,
    user_director,
    user_coordinator,
    users_captivators,
    users_sellers,
  }: ICreateSaleUsedDTO): Promise<Sale> {

    if (company) {
      const companyRepository = new CompanyRepository();
      const percentage = await companyRepository.findOne(company.id);
      if (percentage) {
        percentage_company = percentage.percentage;
      }
    }

    const sale = await this.saleRepository.createSaleUsed({
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
      client_buyer,
      client_seller,
      user_director,
      user_coordinator,
      users_captivators,
      users_sellers,
    });

    if (!sale) {
      throw new AppError('Error when creating the sale, check your data');
    }

    return sale;
  }
}

export default CreateSaleUsedService;
