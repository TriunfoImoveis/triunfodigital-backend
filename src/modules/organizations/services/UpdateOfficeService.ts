import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Office from '@modules/organizations/infra/typeorm/entities/Office';
import IOfficeRepository from '@modules/organizations/repositories/IOfficeRepository';
import IUpdateOfficeDTO from '@modules/organizations/dtos/IUpdateOfficeDTO';

interface RequestDTO {
  id: string;
  body: IUpdateOfficeDTO;
}

@injectable()
class UpdateOfficeService {
  constructor(
    @inject('OfficesRepository')
    private officesRepository: IOfficeRepository,
  ) {}

  public async execute({ id, body }: RequestDTO): Promise<Office | undefined> {
    const checkOfficeExist = await this.officesRepository.findById(id);

    if (!checkOfficeExist) {
      throw new AppError('Office not exist.', 404);
    }

    const officeUpdated = await this.officesRepository.update(body);

    if (!officeUpdated) {
      throw new AppError('error when updating the office, check your data', 400);
    }

    return officeUpdated;
  }
}

export default UpdateOfficeService;
