import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProfessionRepository from '../repositories/IProfessionRepository';
import ICreateProfessionDTO from '../dtos/ICreateProfessionDTO';
import Profession from '../infra/typeorm/entities/Professions';

@injectable()
class CreateBuilderService {
  constructor(
    @inject('ProfessionRepository')
    private professionRepository: IProfessionRepository,
  ){}

  public async execute({
    name,
  }: ICreateProfessionDTO): Promise<Profession> {
    const checkProfessionExists = await this.professionRepository.findByName(name);

    if (checkProfessionExists) {
      throw new AppError("Essa Profissão já existe.", 400);
    }

    const profession = await this.professionRepository.create({
      name,
    });

    if (!profession) {
      throw new AppError(
        "Erro durante a criação da construtora, ckeck seus dados",
        400
      );
    }

    return profession;
  }
}

export default CreateBuilderService;
