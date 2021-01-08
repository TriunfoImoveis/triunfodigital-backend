import { inject, injectable } from "tsyringe";

import AppError from '@shared/errors/AppError';
import IDepartamentRepository from "@modules/organizations/repositories/IDepartamentRepository";
import Departament from "@modules/organizations/infra/typeorm/entities/Departament";

@injectable()
class ShowDepartamentService {
  constructor(
    @inject('DepartamentsRepository')
    private departamentsRepository: IDepartamentRepository,
  ){}

  public async execute(id: string): Promise<Departament> {
    const departament = await this.departamentsRepository.findById(id);

    if (!departament) {
      throw new AppError('Departament not exists.', 404);
    }

    return departament;
  }
}

export default ShowDepartamentService;