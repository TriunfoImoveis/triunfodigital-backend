import { inject, injectable } from "tsyringe";

import AppError from '@shared/errors/AppError';
import IOfficeRepository from "@modules/organizations/repositories/IOfficeRepository";
import Office from "@modules/organizations/infra/typeorm/entities/Office";

@injectable()
class ShowOfficeService {
  constructor(
    @inject('OfficesRepository')
    private officesRepository: IOfficeRepository,
  ){}

  public async execute(id: string): Promise<Office> {
    const office = await this.officesRepository.findById(id);

    if (!office) {
      throw new AppError('Office not exists.', 404);
    }

    return office;
  }
}

export default ShowOfficeService;