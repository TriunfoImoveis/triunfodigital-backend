import AppError from '@shared/errors/AppError';
import Departament from '@modules/organizations/infra/typeorm/entities/Departament';
import IUpdateDepartamentDTO from '@modules/organizations/dtos/IUpdateDepartamentDTO';
import IDepartamentRepository from '@modules/organizations/repositories/IDepartamentRepository';
import { inject, injectable } from 'tsyringe';

interface IRequestDTO {
  id: string;
  data: IUpdateDepartamentDTO;
}

@injectable()
class UpdateDepartamentService {
  constructor(
    @inject('DepartamentsRepository')
    private departamentsRepository: IDepartamentRepository,
  ) {}

  public async execute({
    id,
    data,
  }: IRequestDTO): Promise<Departament> {
    const checkDepartamentExist = await this.departamentsRepository.findById(id);

    if (!checkDepartamentExist) {
      throw new AppError('Departament not exist.', 404);
    }

    const departamentUpdated = await this.departamentsRepository.update(
      id, data
    );

    if (!departamentUpdated) {
      throw new AppError('error when updating the departament, check your data', 400);
    }

    return departamentUpdated;
  }
}

export default UpdateDepartamentService;
