import AppError from '@shared/errors/AppError';
import Subsidiary from '@modules/organizations/infra/typeorm/entities/Subsidiary';
import ISubsidiaryRepository from '@modules/organizations/repositories/ISubsidiaryRepository';
import ICreateSubsidiaryDTO from '@modules/organizations/dtos/ICreateSubsidiaryDTO';

class CreateSubsidiaryService {
  constructor(private subsidiariesRepository: ISubsidiaryRepository) {}

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
      throw new AppError('Subsidiary already used.');
    }

    const subsidiary = await this.subsidiariesRepository.create({
      name,
      goal,
      city,
      state,
      country,
    });

    if (!subsidiary) {
      throw new AppError('error when creating the Subsidiary, check your data');
    }

    return subsidiary;
  }
}

export default CreateSubsidiaryService;
