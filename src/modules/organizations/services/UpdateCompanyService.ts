import AppError from '@shared/errors/AppError';
import IUpdateCompanyDTO from "@modules/sales/dtos/IUpdateCompanyDTO";
import Company from "@modules/organizations/infra/typeorm/entities/Company";
import ICompanyRepository from "@modules/organizations/repositories/ICompanyRepository";

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
      throw new AppError("Empresa não existe.", 404);
    }

    const companyUpdated = await this.companyRepository.update(id, data);

    if (!companyUpdated) {
      throw new AppError(
        "Erro ao atualizar empresa, check seus dados e tente novamente.", 
        400
      );
    }

    return companyUpdated;
  }
}

export default UpdateCompanyService;
