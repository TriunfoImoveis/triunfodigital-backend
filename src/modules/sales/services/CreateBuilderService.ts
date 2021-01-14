import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Builder from '@modules/sales/infra/typeorm/entities/Builder';
import IBuilderRepository from '@modules/sales/repositories/IBuilderRepository';
import ICreateBuilderDTO from '@modules/sales/dtos/ICreateBuilderDTO';

@injectable()
class CreateBuilderService {
  constructor(
    @inject('BuildersRepository')
    private buildersRespository: IBuilderRepository,
  ){}

  public async execute({
    name,
    cnpj,
    email,
    phone,
    responsible,
    state,
    city,
  }: ICreateBuilderDTO): Promise<Builder> {
    const checkBuilderExists = await this.buildersRespository.findByCNPJ(cnpj);

    if (checkBuilderExists) {
      throw new AppError("Construtora com este CNPJ já existe.", 400);
    }

    const builder = await this.buildersRespository.create({
      name,
      cnpj,
      email,
      phone,
      responsible,
      state,
      city,
    });

    if (!builder) {
      throw new AppError(
        "Erro durante a criação da construtora, ckeck seus dados",
        400
      );
    }

    return builder;
  }
}

export default CreateBuilderService;
