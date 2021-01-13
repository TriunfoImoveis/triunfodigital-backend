import { inject, injectable } from "tsyringe";

import IBuilderRepository from "@modules/sales/repositories/IBuilderRepository";
import Builder from "@modules/sales/infra/typeorm/entities/Builder";
import IRequestBuilderDTO from "@modules/sales/dtos/IRequestBuilderDTO";

@injectable()
class ListBuilderService {
  constructor(
    @inject('BuildersRepository')
    private buildersRepository: IBuilderRepository,
  ) {}

  public async execute({name, uf, city}: IRequestBuilderDTO): Promise<Builder[]> {
    const builders = await this.buildersRepository.findBuildersActive({
      name, 
      uf, 
      city
    });

    return builders;
  }
}

export default ListBuilderService;