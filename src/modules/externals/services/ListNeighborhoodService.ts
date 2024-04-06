import { inject, injectable } from 'tsyringe';
import INeighborhoodRepository from '../repositories/INeighborhoodRepository';
import ICreateNeighborhoodDTO from '../dtos/ICreateNeighborhoodDTO';
import Neighborhood from '../infra/typeorm/entities/Neighborhood';
import IRequestNeighborhoodDTO from '../dtos/IRequestNeighborhoodDTO';

@injectable()
class ListNeighborhoodService {
  constructor(
    @inject('NeighborhoodRepository')
    private neighborhoodRepository: INeighborhoodRepository,
  ) {}

  public async execute(data?: IRequestNeighborhoodDTO): Promise<Neighborhood[]> {
    if (data) {
      const neighborhoods = await this.neighborhoodRepository.findByFilters(data);

      return neighborhoods;
    }

    const neighborhoods = await this.neighborhoodRepository.findAll();

    return neighborhoods;
  }
}

export default ListNeighborhoodService;
