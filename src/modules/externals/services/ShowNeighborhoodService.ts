import { inject, injectable } from 'tsyringe';

import INeighborhoodRepository from '../repositories/INeighborhoodRepository';
import Neighborhood from '../infra/typeorm/entities/Neighborhood';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowNeighborhoodService {
  constructor(
    @inject('NeighborhoodRepository')
    private neighborhoodRepository: INeighborhoodRepository,
  ) {}

  public async execute(id: string): Promise<Neighborhood> {
    const neighborhood = await this.neighborhoodRepository.findById(id);

    if (!neighborhood) {
      throw new AppError('Neighborhood not found', 404);
    }

    return neighborhood;
  }
}

export default ShowNeighborhoodService;
