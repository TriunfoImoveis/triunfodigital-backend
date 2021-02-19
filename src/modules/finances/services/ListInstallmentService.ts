import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IInstallmentRepository from '@modules/finances/repositories/IInstallmentRepository';
import Installment, { StatusInstallment } from '@modules/finances/infra/typeorm/entities/Installment';
import { isFuture, isPast, parseISO } from 'date-fns';

@injectable()
class ListInstallmentService {
  constructor(
    @inject('InstallmentsRepository')
    private installmentsRepository: IInstallmentRepository,
  ) {}

  public async execute(): Promise<Installment[]> {
    const listInstallments = await this.installmentsRepository.list();

    listInstallments.filter((installment) => {
      if (installment.status === StatusInstallment.PEN) {
        const dateFormated = parseISO(installment.due_date.toString());
        if (isPast(dateFormated)) {
          installment.status = StatusInstallment.VEN;
        }
      }
    });
    
    return listInstallments;
  }
}

export default ListInstallmentService;
