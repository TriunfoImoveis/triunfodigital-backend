import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Departament from '../entities/Departament';

interface Request {
  name: string;
  initials: string;
  goal?: number;
  subsidiary_id: string;
}

class CreateUserService {
  public async execute({
    name,
    initials,
    goal,
    subsidiary_id,
  }: Request): Promise<Departament> {
    const departamentRepository = getRepository(Departament);

    const checkdepartamentExist = await departamentRepository.findOne({
      where: { name },
    });

    if (checkdepartamentExist) {
      throw new AppError('departament already used.');
    }

    let goalDepartament = goal;
    if (!goal) {
      goalDepartament = 0;
    }

    const departament = departamentRepository.create({
      name,
      initials,
      goal: goalDepartament,
      subsidiary_id,
    });

    if (!departament) {
      throw new AppError(
        'error when creating the departament, check your data',
      );
    }

    await departamentRepository.save(departament);

    return departament || undefined;
  }
}

export default CreateUserService;
