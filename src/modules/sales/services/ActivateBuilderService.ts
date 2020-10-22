import AppError from '@shared/errors/AppError';
import IBuilderRepository from '@modules/sales/repositories/IBuilderRepository';
import Builder from '@modules/sales/infra/typeorm/entities/Builder';


interface IRequestDTO {
  id: string;
}

class ActivateBuilderService {
  constructor(private buildersRepository: IBuilderRepository) {}

  public async execute({ id }: IRequestDTO): Promise<Builder> {
    const builder = await this.buildersRepository.findById(id);

    if (!builder) {
      throw new AppError('Builder not exists.');
    }

    const builderActivate = await this.buildersRepository.activate(id);

    if (!builderActivate) {
      throw new AppError('Error when activating the builder, check your data.');
    }

    return builderActivate;
  }
}

export default ActivateBuilderService;
