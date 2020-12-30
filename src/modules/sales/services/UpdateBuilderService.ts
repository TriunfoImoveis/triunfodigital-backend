import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUpdateBuilderDTO from '@modules/sales/dtos/IUpdateBuilderDTO';
import IBuilderRepository from '@modules/sales/repositories/IBuilderRepository';
import Builder from '@modules/sales/infra/typeorm/entities/Builder';



interface IRequestDTO {
  id: string;
  data: IUpdateBuilderDTO;
}

@injectable()
class UpdateBuilderService {
  constructor(
    @inject('BuildersRepository')
    private buildersRepository: IBuilderRepository
  ) {}

  public async execute({ id, data }: IRequestDTO): Promise<Builder> {
    const checkBuilderExists = await this.buildersRepository.findById(id);

    if (!checkBuilderExists) {
      throw new AppError('Builder not exists.', 404);
    }

    const builderUpdated = await this.buildersRepository.update(id, data);

    if (!builderUpdated) {
      throw new AppError('Error when updating the Builder, check your data', 400);
    }

    return builderUpdated;
  }
}

export default UpdateBuilderService;
