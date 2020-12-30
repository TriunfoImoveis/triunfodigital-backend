import AppError from '@shared/errors/AppError';
import ICompanyRepository from '@modules/organizations/repositories/ICompanyRepository';


interface IRequestDTO {
  id: string;
}

class DeactivateCompanyService {
  constructor(private companyRepository: ICompanyRepository) {}

  public async execute({ id }: IRequestDTO): Promise<void> {
    const company = await this.companyRepository.findOne(id);

    if (!company) {
      throw new AppError('Company not exists.');
    }

    await this.companyRepository.deactivate(id);
  }
}

export default DeactivateCompanyService;
