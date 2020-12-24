import AppError from '@shared/errors/AppError';
import Departament from '@modules/organizations/infra/typeorm/entities/Departament';
import IDepartamentRepository from '@modules/organizations/repositories/IDepartamentRepository';
import ICreateDepartamentDTO from '@modules/organizations/dtos/ICreateDepartamentDTO';

class CreateDepartamentService {
  constructor(
    private departamentsRepository: IDepartamentRepository
  ){}

  public async execute({
    name,
    initials,
    goal,
    subsidiary,
  }: ICreateDepartamentDTO): Promise<Departament | undefined> {
    const checkDepartamentExist = await this.departamentsRepository.findByNameAndSubsidiary(name, subsidiary);

    if (checkDepartamentExist) {
      throw new AppError('Departament already exist in this Subsidiary.');
    }

    let goalDepartament = goal;
    if (!goal) {
      goalDepartament = 0;
    }

    const departament = await this.departamentsRepository.create({
      name,
      initials,
      goal: goalDepartament,
      subsidiary,
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
