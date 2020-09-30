import AppError from '@shared/errors/AppError';
import Builder from '@modules/sales/infra/typeorm/entities/Builder';
import IBuilderRepository from '@modules/sales/repositories/IBuilderRepository';
import ICreateBuilderDTO from '@modules/sales/dtos/ICreateBuilderDTO';

class CreateBuilderService {
  constructor(private buildersRespository: IBuilderRepository){}

  public async execute({
    name,
    cnpj,
    email,
    phone,
    responsible,
  }: ICreateBuilderDTO): Promise<Builder> {
    const checkBuilderExists = await this.buildersRespository.findByCNPJ(cnpj);

    if (checkBuilderExists) {
      throw new AppError('Client with this CPF already exists.');
    }

    const builder = await this.buildersRespository.create({
      name,
      cnpj,
      email,
      phone,
      responsible,
    });

    if (!builder) {
      throw new AppError('Error when creating the builder, check your data');
    }

    return builder;
  }
}

export default CreateBuilderService;
