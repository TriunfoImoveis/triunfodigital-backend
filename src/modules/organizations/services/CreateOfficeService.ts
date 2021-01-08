import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Office from '@modules/organizations/infra/typeorm/entities/Office';
import IOfficeRepository from '@modules/organizations/repositories/IOfficeRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateOfficeService {
  constructor(
    @inject('OfficesRepository')
    private officesRepository: IOfficeRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Office> {
    const checkOfficeExist = await this.officesRepository.findByName(name);

    if (checkOfficeExist) {
      throw new AppError('Office already used.', 404);
    }

    const office = await this.officesRepository.create({ name });

    if (!office) {
      throw new AppError('error when creating the office, check your data', 400);
    }

    return office;
  }
}

export default CreateOfficeService;
