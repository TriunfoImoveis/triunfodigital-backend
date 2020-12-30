import { inject, injectable } from "tsyringe";

import IBuilderRepository from "@modules/sales/repositories/IBuilderRepository";
import Builder from "@modules/sales/infra/typeorm/entities/Builder";

@injectable()
class ListBuilderService {
  constructor(
    @inject('BuildersRepository')
    private buildersRepository: IBuilderRepository,
  ) {}

  public async execute(): Promise<Builder[]> {
    const builders = await this.buildersRepository.findBuildersActive();

    return builders;
  }
}

export default ListBuilderService;