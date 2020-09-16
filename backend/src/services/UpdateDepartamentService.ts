import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Departament from '../entities/Departament';

interface RequestDTO {
  id: string;
  body: Object;
}

class UpdateDepartamentService {
  public async execute({
    id,
    body,
  }: RequestDTO): Promise<Departament | undefined> {
    const departamentRepository = getRepository(Departament);
    const checkDepartamentExist = await departamentRepository.findOne(id);

    if (!checkDepartamentExist) {
      throw new AppError('Departament not exist.');
    }

    // if (body.hasOwnProperty('subsidiary_id')) {
    //   console.log(body["subsidiary_id"]);
    //   // const subsidiaryIsValid = validate();
    // }

    await departamentRepository.update(id, body);

    const departamentUpdated = await departamentRepository.findOne(id);

    return departamentUpdated;
  }
}

export default UpdateDepartamentService;
