import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Profession from '../infra/typeorm/entities/Professions';
import IProfessionRepository from '../repositories/IProfessionRepository';
import IUpdateProfessionDTO from '../dtos/IUpdateProfessionDTO';

@injectable()
class UpdateProfessionService {
  constructor(
    @inject('ProfessionsRepository')
    private professionRepository: IProfessionRepository,
  ) {}

  public async execute({
    id,
    name,
    active,
  }: IUpdateProfessionDTO): Promise<Profession> {
    const profession = await this.professionRepository.findById(id);

    if (!profession) {
      throw new AppError('Profissão não encontrada', 404);
    }

    if (name && name !== profession.name) {
      const professionWithName = await this.professionRepository.findByName(name);

      if (professionWithName && professionWithName.id !== id) {
        throw new AppError('Essa profissão já existe.', 400);
      }
    }

    const updated = await this.professionRepository.update({
      id,
      name: name ? name : profession.name,
      active: typeof active === 'boolean' ? active : profession.active,
    });

    if (!updated) {
      throw new AppError('Erro ao atualizar a profissão', 500);
    }

    return updated;
  }
}

export default UpdateProfessionService;
