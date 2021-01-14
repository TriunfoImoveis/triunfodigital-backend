import AppError from '@shared/errors/AppError';
import IBuilderRepository from '@modules/sales/repositories/IBuilderRepository';
import Builder from '@modules/sales/infra/typeorm/entities/Builder';
import { inject, injectable } from 'tsyringe';

interface IRequestDTO {
  id: string;
}

@injectable()
class ShowBuilderService {
  constructor(
    @inject('BuildersRepository')
    private buildersRepository: IBuilderRepository,
  ) {}

  public async execute({ id }: IRequestDTO): Promise<Builder> {
    const builder = await this.buildersRepository.findByIdAndActivate(id);

    if (!builder) {
      throw new AppError("Contrutora não existe.", 404);
    }

    return builder;
  }
}

export default ShowBuilderService;
