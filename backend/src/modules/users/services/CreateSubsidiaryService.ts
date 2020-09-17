import AppError from '@shared/errors/AppError';
import Subsidiary from '../infra/typeorm/entities/Subsidiary';
import ISubsidiaryRepository from '../repositories/ISubsidiaryRepository';

interface IRequest {
  name: string;
  goal: number;
}

class CreateSubsidiaryService {
  constructor(private subsidiariesRepository: ISubsidiaryRepository) {}

  public async execute({ name, goal }: IRequest): Promise<Subsidiary> {
    const checkSubsidiaryExist = await this.subsidiariesRepository.findByName(
      name,
    );

    if (checkSubsidiaryExist) {
      throw new AppError('Subsidiary already used.');
    }

    const subsidiary = await this.subsidiariesRepository.create({ name, goal });

    if (!subsidiary) {
      throw new AppError('error when creating the Subsidiary, check your data');
    }

    return subsidiary;
  }
}

export default CreateSubsidiaryService;
