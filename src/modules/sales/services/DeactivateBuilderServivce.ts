import AppError from '@shared/errors/AppError';
import IBuilderRepository from '@modules/sales/repositories/IBuilderRepository';


interface IRequestDTO {
  id: string;
}

class DeactivateBuilderService {
  constructor(private buildersRepository: IBuilderRepository) {}

  public async execute({ id }: IRequestDTO): Promise<void> {
    const builder = await this.buildersRepository.findById(id);

    if (!builder) {
      throw new AppError('Builder not exists.');
    }

    await this.buildersRepository.deactivate(id);
  }
}

export default DeactivateBuilderService;
