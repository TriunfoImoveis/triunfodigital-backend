import { inject, injectable } from 'tsyringe';
import INeighborhoodRepository from '../repositories/INeighborhoodRepository';
import ICreateNeighborhoodDTO from '../dtos/ICreateNeighborhoodDTO';

@injectable()
class CreateNeighborhoodService {
  constructor(
    @inject('NeighborhoodRepository')
    private neighborhoodRepository: INeighborhoodRepository,
  ) {}

  public async execute(data: ICreateNeighborhoodDTO): Promise<void> {
    await this.neighborhoodRepository.create(data);
  }
}

export default CreateNeighborhoodService;
