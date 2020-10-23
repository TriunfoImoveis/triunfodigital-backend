import AppError from '@shared/errors/AppError';
import Departament from '@modules/users/infra/typeorm/entities/Departament';
import IDepartamentRepository from '@modules/users/repositories/IDepartamentRepository';
import ICreateDepartamentDTO from '@modules/users/dtos/ICreateDepartamentDTO';
import ISubsidiaryRepository from '@modules/users/repositories/ISubsidiaryRepository';

class CreateDepartamentService {
  constructor(
    private departamentsRepository: IDepartamentRepository,
    private subsidiaryRepository: ISubsidiaryRepository
  ){}

  public async execute({
    name,
    initials,
    goal,
    subsidiary,
  }: ICreateDepartamentDTO): Promise<Departament | undefined> {
    const checkDepartamentExist = await this.departamentsRepository.findByNameAndSubsidiary(name, subsidiary.id);

    if (checkDepartamentExist.length !== 0) {
      throw new AppError('Departament already exist in this Subsidiary.');
    }

    const checkSubsidiaryExist = await this.subsidiaryRepository.findById(subsidiary.id);
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
