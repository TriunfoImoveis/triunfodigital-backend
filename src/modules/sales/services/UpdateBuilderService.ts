import AppError from '@shared/errors/AppError';
import IUpdateBuilderDTO from '@modules/sales/dtos/IUpdateBuilderDTO';
import IBuilderRepository from '@modules/sales/repositories/IBuilderRepository';
import Builder from '@modules/sales/infra/typeorm/entities/Builder';


interface IRequestDTO {
  id: string;
  data: IUpdateBuilderDTO;
}

class UpdateBuilderService {
  constructor(private buildersRepository: IBuilderRepository) {}

  public async execute({ id, data }: IRequestDTO): Promise<Builder> {
    const checkBuilderExists = await this.buildersRepository.findById(id);

    if (!checkBuilderExists) {
      throw new AppError('Builder not exists.');
    }

    const builderUpdated = await this.buildersRepository.update(id, data);

    if (!builderUpdated) {
      throw new AppError('Error when updating the builder, check your data');
    }

    return builderUpdated;
  }
}

export default UpdateBuilderService;
