import { inject, injectable } from 'tsyringe';
import { isFuture, isPast, parseISO } from 'date-fns';

import IInstallmentRepository from '@modules/finances/repositories/IInstallmentRepository';
import Installment, { StatusInstallment } from '@modules/finances/infra/typeorm/entities/Installment';
import IRequestInstallmentDTO from '@modules/finances/dtos/IRequestInstallmentDTO';

@injectable()
class ListInstallmentService {
  constructor(
    @inject('InstallmentsRepository')
    private installmentsRepository: IInstallmentRepository,
  ) {}

  public async execute({
    buyer_name,
    subsidiary,
    status,
    month,
    year,
    dateFrom,
    dateTo
  }: IRequestInstallmentDTO): Promise<Installment[]> {

    var statusFilter: any;
    if (!status) {
      statusFilter = [StatusInstallment.PEN, StatusInstallment.PAG, StatusInstallment.CAI, StatusInstallment.LIQ]
    } else if (status === StatusInstallment.VEN) {
      statusFilter = [StatusInstallment.PEN];
    } else {
      statusFilter = [status];
    }

    const listInstallments = await this.installmentsRepository.listFilters({
      buyer_name,
      subsidiary,
      status: statusFilter,
      month,
      year,
      dateFrom,
      dateTo
    });

    if (status === StatusInstallment.PEN) {
      const installments = listInstallments.filter((installment) => {
        const dateFormated = parseISO(installment.due_date.toString());
        if (isFuture(dateFormated)) {
          return installment;
        }
      });

      return installments;
    } else if (status === StatusInstallment.VEN) {
      const installments = listInstallments.filter((installment) => {
        const dateFormated = parseISO(installment.due_date.toString());
        if (isPast(dateFormated)) {
          installment.status = StatusInstallment.VEN;
          return installment;
        }
      });

      return installments;
    } else {
      listInstallments.filter((installment) => {
        const dateFormated = parseISO(installment.due_date.toString());
        if ((installment.status === StatusInstallment.PEN) && (isPast(dateFormated))) {
          installment.status = StatusInstallment.VEN;
        }
      });
    }

    return listInstallments;
  }
}

export default ListInstallmentService;
