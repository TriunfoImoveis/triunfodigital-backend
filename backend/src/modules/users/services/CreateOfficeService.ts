import AppError from '@shared/errors/AppError';
import Office from '../infra/typeorm/entities/Office';
import IOfficeRepository from '../repositories/IOfficeRepository';

interface Request {
  name: string;
}

class CreateOfficeService {
  constructor(private officesRepository: IOfficeRepository) {}

  public async execute({ name }: Request): Promise<Office> {
    const checkOfficeExist = await this.officesRepository.findByName(name);

    if (checkOfficeExist) {
      throw new AppError('Office already used.');
    }

    const office = await this.officesRepository.create({ name });

    if (!office) {
      throw new AppError('error when creating the office, check your data');
    }

    return office;
  }
}

export default CreateOfficeService;
