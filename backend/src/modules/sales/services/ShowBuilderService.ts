import AppError from '@shared/errors/AppError';
import IBuilderRepository from '@modules/sales/repositories/IBuilderRepository';
import Builder from '@modules/sales/infra/typeorm/entities/Builder';


interface IRequestDTO {
  id: string;
}

class ShowBuilderService {
  constructor(
    private buildersRepository: IBuilderRepository) {}

  public async execute({ id }: IRequestDTO): Promise<Builder> {
    const builder = await this.buildersRepository.findByIdAndActivate(id);

    if (!builder) {
      throw new AppError('Builder not exists.');
    }

    return builder;
  }
}

export default ShowBuilderService;
