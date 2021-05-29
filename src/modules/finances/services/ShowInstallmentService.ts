import { inject, injectable } from 'tsyringe';
import { isPast, parseISO } from 'date-fns';

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

    if (installment.status === StatusInstallment.PEN) {
      const dateFormated = parseISO(installment.due_date.toString());
      if (isPast(dateFormated)) {
        installment.status = StatusInstallment.VEN;
      }
    }

    return installment;
  }
}

export default ShowInstallmentService;
