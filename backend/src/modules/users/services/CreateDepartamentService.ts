import { validate } from 'uuid';

import AppError from '@shared/errors/AppError';
import Departament from '../infra/typeorm/entities/Departament';
import IDepartamentRepository from '../repositories/IDepartamentRepository';
import ICreateDepartamentDTO from '../dtos/ICreateDepartamentDTO';
import ISubsidiaryRepository from '../repositories/ISubsidiaryRepository';

class CreateDepartamentService {
  constructor(
    private departamentsRepository: IDepartamentRepository,
    private subsidiaryRepository: ISubsidiaryRepository
  ){}

  public async execute({
    name,
    initials,
    goal,
    subsidiary_id,
  }: ICreateDepartamentDTO): Promise<Departament | undefined> {
    const checkDepartamentExist = await this.departamentsRepository.findByNameAndSubsidiary(name, subsidiary_id);

    if (checkDepartamentExist.length !== 0) {
      throw new AppError('Departament already exist in this Subsidiary.');
    }

    const subsidiaryIsValid = validate(subsidiary_id);
    if (!subsidiaryIsValid) {
      throw new AppError('Subsidiary id invalid.');
    }

    const checkSubsidiaryExist = await this.subsidiaryRepository.findById(subsidiary_id);
    if (!checkSubsidiaryExist) {
      throw new AppError('Subsidiary not exist.');
    }

    let goalDepartament = goal;
    if (!goal) {
      goalDepartament = 0;
    }

    const departament = await this.departamentsRepository.create({
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

    return departament;
  }
}

export default CreateDepartamentService;
