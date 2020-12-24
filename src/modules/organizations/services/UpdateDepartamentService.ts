import AppError from '@shared/errors/AppError';
import Departament from '@modules/organizations/infra/typeorm/entities/Departament';
import IUpdateDepartamentDTO from '@modules/organizations/dtos/IUpdateDepartamentDTO';
import IDepartamentRepository from '@modules/organizations/repositories/IDepartamentRepository';

interface IRequestDTO {
  id: string;
  data: IUpdateDepartamentDTO;
}

class UpdateDepartamentService {
  constructor(private departamentsRepository: IDepartamentRepository) {}

  public async execute({
    id,
    data,
  }: IRequestDTO): Promise<Departament | undefined> {
    const checkDepartamentExist = await this.departamentsRepository.findById(id);

    if (!checkDepartamentExist) {
      throw new AppError('Departament not exist.');
    }

    const departamentUpdated = await this.departamentsRepository.update(
      id, data
    );

    return departamentUpdated;
  }
}

export default UpdateDepartamentService;
