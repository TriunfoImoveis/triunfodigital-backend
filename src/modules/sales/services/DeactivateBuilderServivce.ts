import AppError from '@shared/errors/AppError';
import IBuilderRepository from '@modules/sales/repositories/IBuilderRepository';
import { inject, injectable } from 'tsyringe';


interface IRequestDTO {
  id: string;
}

@injectable()
class DeactivateBuilderService {
  constructor(
    @inject('BuildersRepository')
    private buildersRepository: IBuilderRepository,
  ) {}

  public async execute({ id }: IRequestDTO): Promise<void> {
    const builder = await this.buildersRepository.findById(id);

    if (!builder) {
      throw new AppError('Builder not exists.', 404);
    }

    await this.buildersRepository.deactivate(id);
  }
}

export default DeactivateBuilderService;
