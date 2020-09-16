import { getRepository } from 'typeorm';
import { isUuid } from 'uuidv4';

import AppError from '@shared/errors/AppError';
import Departament from '../infra/typeorm/entities/Departament';
import Subsidiary from '../infra/typeorm/entities/Subsidiary';

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
    const subsidiaryRepository = getRepository(Subsidiary);

    const checkDepartamentExist = await departamentRepository.findOne({
      where: { name },
    });

    if (checkDepartamentExist) {
      throw new AppError('Departament already exist.');
    }

    const subsidiaryIsValid = isUuid(subsidiary_id);
    if (!subsidiaryIsValid) {
      throw new AppError('Subsidiary id invalid.');
    }

    const subsidiaryNotExist = await subsidiaryRepository.findOne(
      subsidiary_id,
    );
    if (!subsidiaryNotExist) {
      throw new AppError('Subsidiary not exist.');
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
