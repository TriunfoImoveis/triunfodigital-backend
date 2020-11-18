import AppError from '@shared/errors/AppError';
import ICreateCompanyDTO from "@modules/sales/dtos/ICreateCompanyDTO";
import Company from "@modules/sales/infra/typeorm/entities/Company";
import ICompanyRepository from "@modules/sales/repositories/ICompanyRepository";

class CreateCompanyService {
  constructor(private companyRepository: ICompanyRepository) {}

  public async execute({
    name,
    percentage,
  }: ICreateCompanyDTO): Promise<Company> {
    const checkCompanyExists = await this.companyRepository.findByName(name);

    if (checkCompanyExists) {
      throw new AppError('Company with this Name already exists.');
    }

    const company = await this.companyRepository.create({
      name,
      percentage,
    });

    if (!company) {
      throw new AppError('Error when creating the Company, check your data');
    }

    return company;
  }
}

export default CreateCompanyService;
