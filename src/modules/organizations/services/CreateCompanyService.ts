import AppError from '@shared/errors/AppError';
import ICreateCompanyDTO from "@modules/sales/dtos/ICreateCompanyDTO";
import Company from "@modules/organizations/infra/typeorm/entities/Company";
import ICompanyRepository from "@modules/organizations/repositories/ICompanyRepository";

class CreateCompanyService {
  constructor(private companyRepository: ICompanyRepository) {}

  public async execute({
    name,
    cnpj,
  }: ICreateCompanyDTO): Promise<Company> {
    const checkCompanyExists = await this.companyRepository.findByCNPJ(cnpj);

    if (checkCompanyExists) {
      throw new AppError("Empresa com este CNPJ já existe.", 400);
    }

    const company = await this.companyRepository.create({
      name,
      cnpj,
    });

    if (!company) {
      throw new AppError(
        "Erro ao criar empresa, check seus dados e tente novamente.", 
        400
      );
    }

    return company;
  }
}

export default CreateCompanyService;
