import { inject, injectable } from "tsyringe";

import AppError from '@shared/errors/AppError';
import ISubsidiaryRepository from "@modules/organizations/repositories/ISubsidiaryRepository";
import Subsidiary from "@modules/organizations/infra/typeorm/entities/Subsidiary";


@injectable()
class ShowSubsidiaryService {
  constructor(
    @inject('SubsidiariesRepository')
    private subsidiariesRepository: ISubsidiaryRepository,
  ){}

  public async execute(id: string): Promise<Subsidiary> {
    const subdiary = await this.subsidiariesRepository.findById(id);

    if (!subdiary) {
      throw new AppError('Subsidiary not exists.', 404);
    }

    return subdiary;
  }
}

export default ShowSubsidiaryService;