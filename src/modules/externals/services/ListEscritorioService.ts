import { inject, injectable } from 'tsyringe';
import IEscritorioRepository from '@modules/externals/repositories/IEscritorioRepository';
import Escritorio from '@modules/externals/infra/typeorm/entities/Escritorio';

@injectable()
class ListEscritorioService {
  constructor(
    @inject('EscritorioRepository')
    private escritoriosRepository: IEscritorioRepository,
  ) {}

  public async execute(): Promise<Escritorio[]> {
    const escritorios = await this.escritoriosRepository.findAll();

    return escritorios;
  }
}

export default ListEscritorioService;
