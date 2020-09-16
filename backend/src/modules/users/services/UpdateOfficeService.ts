import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Office from '../infra/typeorm/entities/Office';

interface RequestDTO {
  id: string;
  body: Object;
}

class UpdateOfficeService {
  public async execute({ id, body }: RequestDTO): Promise<Office | undefined> {
    const officeRepository = getRepository(Office);
    const checkOfficeExist = await officeRepository.findOne(id);

    if (!checkOfficeExist) {
      throw new AppError('Office not exist.');
    }

    const officeUpdated = await officeRepository.update(id, body);

    if (!officeUpdated) {
      throw new AppError('error when updating the office, check your data');
    }

    const office = await officeRepository.findOne(id);

    return office;
  }
}

export default UpdateOfficeService;
