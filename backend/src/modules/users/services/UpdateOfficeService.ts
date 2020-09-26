import AppError from '@shared/errors/AppError';
import Office from '@modules/users/infra/typeorm/entities/Office';
import IOfficeRepository from '@modules/users/repositories/IOfficeRepository';
import IUpdateOfficeDTO from '@modules/users/dtos/IUpdateOfficeDTO';

interface RequestDTO {
  id: string;
  body: IUpdateOfficeDTO;
}

class UpdateOfficeService {
  constructor(private officesRepository: IOfficeRepository) {}

  public async execute({ id, body }: RequestDTO): Promise<Office | undefined> {
    const checkOfficeExist = await this.officesRepository.findById(id);

    if (!checkOfficeExist) {
      throw new AppError('Office not exist.');
    }

    const officeUpdated = await this.officesRepository.update(body);

    if (!officeUpdated) {
      throw new AppError('error when updating the office, check your data');
    }

    return officeUpdated;
  }
}

export default UpdateOfficeService;
