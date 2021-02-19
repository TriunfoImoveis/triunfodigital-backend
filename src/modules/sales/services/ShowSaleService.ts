import { inject, injectable } from 'tsyringe';
import { isPast, parseISO } from 'date-fns';

import AppError from '@shared/errors/AppError';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import Sale from '@modules/sales/infra/typeorm/entities/Sale';
import { StatusInstallment } from '@modules/finances/infra/typeorm/entities/Installment';

interface IRequestDTO {
  id: string;
}

@injectable()
class ShowSaleService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISaleRepository,
  ) {}

  public async execute({ id }: IRequestDTO): Promise<Sale> {
    const sale = await this.salesRepository.findById(id);

    if (!sale) {
      throw new AppError("Venda não existe.", 404);
    }

    const listInstallments = sale.installments;

    listInstallments.filter((installment) => {
      if (installment.status === StatusInstallment.PEN) {
        const dateFormated = parseISO(installment.due_date.toString());
        if (isPast(dateFormated)) {
          installment.status = StatusInstallment.VEN;
        }
      }
    });

    return sale;
  }
}

export default ShowSaleService;
