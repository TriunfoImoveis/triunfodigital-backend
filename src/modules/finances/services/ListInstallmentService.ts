import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IInstallmentRepository from '@modules/finances/repositories/IInstallmentRepository';
import Installment from '@modules/finances/infra/typeorm/entities/Installment';

@injectable()
class ListInstallmentService {
  constructor(
    @inject('InstallmentsRepository')
    private installmentsRepository: IInstallmentRepository,
  ) {}

  public async execute(): Promise<Installment[]> {
    const listInstallments = this.installmentsRepository.list();

    return listInstallments;
  }
}

export default ListInstallmentService;
