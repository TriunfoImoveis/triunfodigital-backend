import AppError from '@shared/errors/AppError';
import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import ICreateSaleNewDTO from "@modules/sales/dtos/ICreateSaleNewDTO";
import Sale from '@modules/sales/infra/typeorm/entities/Sale';
import CompanyRepository from '@modules/organizations/infra/typeorm/repositories/CompanyRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

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
    user_coordinator,
    users_directors,
    users_sellers,
  }: ICreateSaleNewDTO): Promise<Sale> {
    var usersRepository = new UsersRepository();

    if (user_coordinator) {
      const coordinatorExists = await usersRepository.findById(String(user_coordinator));
      if (!coordinatorExists) {
        throw new AppError("User coordinator not exists.");
      } else if (coordinatorExists.office.name !== "Coordenador") {
        throw new AppError("User isn't coordinator.");
      }
    }

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
      user_coordinator,
      users_directors,
      users_sellers,
    });

    if (!sale) {
      throw new AppError('Error when creating the sale, check your data');
    }

    return sale;
  }
}

export default CreateSaleNewService;
