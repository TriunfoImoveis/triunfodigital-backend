import AppError from '@shared/errors/AppError';
import ISubsidiaryRepository from '@modules/organizations/repositories/ISubsidiaryRepository';
import Subsidiary from '@modules/organizations/infra/typeorm/entities/Subsidiary';
import IUpdateSubsidiaryDTO from '@modules/organizations/dtos/IUpdateSubsidiaryDTO';

interface IRequest {
  id: string;
  subsidiary: IUpdateSubsidiaryDTO;
}

class UpdateSubsidiaryService {
  constructor(private subsidiariesRepository: ISubsidiaryRepository) {}

  public async execute({
    id,
    subsidiary,
  }: IRequest): Promise<Subsidiary | undefined> {
    const checkSubsidiaryExist = await this.subsidiariesRepository.findById(id);

    if (!checkSubsidiaryExist) {
      throw new AppError('Subsidiary not exist.');
    }

    const subsidiaryUpdated = await this.subsidiariesRepository.update(
      id,
      subsidiary,
    );

    if (!subsidiaryUpdated) {
      throw new AppError('error when updating the subsidiary, check your data');
    }

    return subsidiaryUpdated;
  }
}

export default UpdateSubsidiaryService;
