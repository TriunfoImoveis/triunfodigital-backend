import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Subsidiary from '@modules/organizations/infra/typeorm/entities/Subsidiary';
import ISubsidiaryRepository from '@modules/organizations/repositories/ISubsidiaryRepository';
import ICreateSubsidiaryDTO from '@modules/organizations/dtos/ICreateSubsidiaryDTO';

@injectable()
class CreateSubsidiaryService {
  constructor(
    @inject('SubsidiariesRepository')
    private subsidiariesRepository: ISubsidiaryRepository,
  ) {}

  public async execute({
    name,
    goal,
    city,
    state,
    country,
  }: ICreateSubsidiaryDTO): Promise<Subsidiary> {
    const checkSubsidiaryExist = await this.subsidiariesRepository.findByName(
      name,
    );

    if (checkSubsidiaryExist) {
      throw new AppError('Subsidiary already used.', 400);
    }

    const subsidiary = await this.subsidiariesRepository.create({
      name,
      goal,
      city,
      state,
      country,
    });

    if (!subsidiary) {
      throw new AppError('error when creating the Subsidiary, check your data', 400);
    }

    return subsidiary;
  }
}

export default CreateSubsidiaryService;
