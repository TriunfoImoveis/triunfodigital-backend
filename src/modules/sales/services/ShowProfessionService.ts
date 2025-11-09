import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Profession from '../infra/typeorm/entities/Professions';
import IProfessionRepository from '../repositories/IProfessionRepository';

@injectable()
class ShowProfessionService {
  constructor(
    @inject('ProfessionsRepository')
    private professionRepository: IProfessionRepository,
  ) {}

  public async execute(id: string): Promise<Profession> {
    const profession = await this.professionRepository.findById(id);

    if (!profession) {
      throw new AppError('Profissão não encontrada', 404);
    }

    return profession;
  }
}

export default ShowProfessionService;
