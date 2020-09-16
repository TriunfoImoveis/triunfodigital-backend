import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Office from '../entities/Office';

interface Request {
  name: string;
}

class CreateOfficeService {
  public async execute({ name }: Request): Promise<Office> {
    const officeRepository = getRepository(Office);

    const checkOfficeExist = await officeRepository.findOne({
      where: { name },
    });

    if (checkOfficeExist) {
      throw new AppError('Office already used.');
    }

    const office = officeRepository.create({
      name,
    });

    if (!office) {
      throw new AppError('error when creating the office, check your data');
    }

    await officeRepository.save(office);

    return office || undefined;
  }
}

export default CreateOfficeService;
