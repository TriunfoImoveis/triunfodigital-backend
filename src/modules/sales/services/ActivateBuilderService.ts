import AppError from '@shared/errors/AppError';
import IBuilderRepository from '@modules/sales/repositories/IBuilderRepository';
import Builder from '@modules/sales/infra/typeorm/entities/Builder';
import { inject, injectable } from 'tsyringe';


interface IRequestDTO {
  id: string;
}

@injectable()
class ActivateBuilderService {
  constructor(
    @inject('BuildersRepository')
    private buildersRepository: IBuilderRepository,
  ) {}

  public async execute({ id }: IRequestDTO): Promise<Builder> {
    const builder = await this.buildersRepository.findById(id);

    if (!builder) {
      throw new AppError('Builder not exists.', 404);
    }

    const builderActivated = await this.buildersRepository.activate(id);

    if (!builderActivated) {
      throw new AppError('Error when activating the Builder, check your data.', 400);
    }

    return builderActivated;
  }
}

export default ActivateBuilderService;
