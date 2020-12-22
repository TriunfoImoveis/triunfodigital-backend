import AppError from '@shared/errors/AppError';
import ICreateCompanyDTO from "@modules/sales/dtos/ICreateCompanyDTO";
import Company from "@modules/sales/infra/typeorm/entities/Company";
import ICompanyRepository from "@modules/sales/repositories/ICompanyRepository";

class CreateCompanyService {
  constructor(private companyRepository: ICompanyRepository) {}

  public async execute({
    name,
    cnpj,
    percentage,
  }: ICreateCompanyDTO): Promise<Company> {
    const checkCompanyExists = await this.companyRepository.findByCNPJ(cnpj);

    if (checkCompanyExists) {
      throw new AppError('Company with this CNPJ already exists.');
    }

    const company = await this.companyRepository.create({
      name,
      cnpj,
      percentage,
    });

    if (!company) {
      throw new AppError('Error when creating the Company, check your data');
    }

    return company;
  }
}

export default CreateCompanyService;
