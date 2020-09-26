import AppError from '@shared/errors/AppError';
import Office from '@modules/users/infra/typeorm/entities/Office';
import IOfficeRepository from '@modules/users/repositories/IOfficeRepository';

interface IRequest {
  name: string;
}

class CreateOfficeService {
  constructor(private officesRepository: IOfficeRepository) {}

  public async execute({ name }: IRequest): Promise<Office> {
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
