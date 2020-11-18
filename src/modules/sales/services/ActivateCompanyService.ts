import AppError from '@shared/errors/AppError';
import ICompanyRepository from '@modules/sales/repositories/ICompanyRepository';
import Company from '@modules/sales/infra/typeorm/entities/Company';


interface IRequestDTO {
  id: string;
}

class ActivateCompanyService {
  constructor(private companyRepository: ICompanyRepository) {}

  public async execute({ id }: IRequestDTO): Promise<Company> {
    const company = await this.companyRepository.findOne(id);

    if (!company) {
      throw new AppError('Company not exists.');
    }

    const companyActivate = await this.companyRepository.activate(id);

    if (!companyActivate) {
      throw new AppError('Error when activating the Company, check your data.');
    }

    return companyActivate;
  }
}

export default ActivateCompanyService;
