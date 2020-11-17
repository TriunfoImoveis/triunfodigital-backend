import AppError from '@shared/errors/AppError';
import IUpdateCompanyDTO from "@modules/sales/dtos/IUpdateCompanyDTO";
import Company from "@modules/sales/infra/typeorm/entities/Company";
import ICompanyRepository from "@modules/sales/repositories/ICompanyRepository";

interface IRequestDTO {
  id: string;
  data: IUpdateCompanyDTO;
}

class UpdateCompanyService {
  constructor(private companyRepository: ICompanyRepository) {}

  public async execute({
    id,
    data
  }: IRequestDTO): Promise<Company> {
    const checkCompanyExists = await this.companyRepository.findOne(id);

    if (!checkCompanyExists) {
      throw new AppError('Company not exists.');
    }

    const companyUpdated = await this.companyRepository.update(id, data);

    if (!companyUpdated) {
      throw new AppError('Error when updating the Company, check your data');
    }

    return companyUpdated;
  }
}

export default UpdateCompanyService;
