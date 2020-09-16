import { getRepository } from "typeorm";

import Subsidiary from "../entities/Subsidiary";
import AppError from '../errors/AppError';

interface RequestDTO {
  id: string;
  body: Object;
}

class UpdateSubsidiaryService {
  public async execute({ id, body }: RequestDTO): Promise<Subsidiary | undefined> {
    const subsidiaryRepository = getRepository(Subsidiary);
    const checkSubsidiaryExist = await subsidiaryRepository.findOne(id);

    if (!checkSubsidiaryExist) {
      throw new AppError('Subsidiary not exist.');
    }

    const subsidiaryUpdated = await subsidiaryRepository.update(id, body);

    if (!subsidiaryUpdated) {
      throw new AppError('error when updating the subsidiary, check your data');
    }

    const subsidiary = await subsidiaryRepository.findOne(id);

    return subsidiary;
  }
}

export default UpdateSubsidiaryService;
