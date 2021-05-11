import { inject, injectable } from 'tsyringe';

import IInstallmentRepository from '@modules/finances/repositories/IInstallmentRepository';
import Installment, { StatusInstallment } from '@modules/finances/infra/typeorm/entities/Installment';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowInstallmentService {
  constructor(
    @inject('InstallmentsRepository')
    private installmentsRepository: IInstallmentRepository,
  ) {}

  public async execute(id: string): Promise<Installment> {
    const installment = await this.installmentsRepository.findById(id);

    if (!installment) {
      throw new AppError("Parcela não existe.", 404);
    }

    return installment; 
  }
}

export default ShowInstallmentService;
