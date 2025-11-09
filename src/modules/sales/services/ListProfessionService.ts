// ...existing code...
import { inject, injectable } from 'tsyringe';
import Profession from '../infra/typeorm/entities/Professions';
import IProfessionRepository from '../repositories/IProfessionRepository';

interface IRequest {
  active?: boolean;
}

@injectable()
class ListProfessionService {
  constructor(
    @inject('ProfessionRepository')
    private professionRepository: IProfessionRepository,
  ) {}

  public async execute({ active }: IRequest = {}): Promise<Profession[]> {
    return this.professionRepository.findAll(active);
  }
}

export default ListProfessionService;
