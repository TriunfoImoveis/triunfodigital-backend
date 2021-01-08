import { inject, injectable } from "tsyringe";

import IDepartamentRepository from "@modules/organizations/repositories/IDepartamentRepository";
import Departament from "@modules/organizations/infra/typeorm/entities/Departament";

@injectable()
class ListDepartamentService {
  constructor(
    @inject('DepartamentsRepository')
    private departamentsRepository: IDepartamentRepository,
  ){}

  public async execute(subsidiary: string): Promise<Departament[]> {
    const departaments = await this.departamentsRepository.findDepartamentsActive(
      subsidiary
    );

    return departaments;
  }
}

export default ListDepartamentService;