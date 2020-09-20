import AppError from '@shared/errors/AppError';
import Departament from '@modules/users/infra/typeorm/entities/Departament';
import IUpdateDepartamentDTO from '@modules/users/dtos/IUpdateDepartamentDTO';
import IDepartamentRepository from '@modules/users/repositories/IDepartamentRepository';

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

    // if (body.hasOwnProperty('subsidiary_id')) {
    //   console.log(body["subsidiary_id"]);
    //   // const subsidiaryIsValid = validate();
    // }

    const departamentUpdated = await this.departamentsRepository.update(
      id, data
    );

    return departamentUpdated;
  }
}

export default UpdateDepartamentService;
