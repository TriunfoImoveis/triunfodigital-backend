import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import INeighborhoodRepository from '../repositories/INeighborhoodRepository';

@injectable()
class DeleteNeighborhoodService {
  constructor(
    @inject('NeighborhoodRepository')
    private neighborhoodRepository: INeighborhoodRepository,
  ) {}
  public async execute(id: string): Promise<void> {
    const neighborhood = await this.neighborhoodRepository.findById(id);

    if (!neighborhood) {
      throw new AppError("Bairro não existe.", 404);
    }

    await this.neighborhoodRepository.delete(id);
  }
}

export default DeleteNeighborhoodService;
