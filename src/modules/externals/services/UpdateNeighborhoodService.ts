import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import INeighborhoodRepository from '../repositories/INeighborhoodRepository';
import IUpdateNeighborhoodDTO from '../dtos/IUpdateNeighborhoodDTO';

@injectable()
class UpdateNeighborhoodService {
  constructor(
    @inject('NeighborhoodRepository')
    private neighborhoodRepository: INeighborhoodRepository,
  ) {}

  public async execute(id: string, data: IUpdateNeighborhoodDTO): Promise<void> {
    const neighborhood = await this.neighborhoodRepository.findById(id);

    if (!neighborhood) {
      throw new AppError("Bairro não existe.", 404);
    }

    await this.neighborhoodRepository.update(id, data);
  }
}

export default UpdateNeighborhoodService;
