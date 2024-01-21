import { inject, injectable } from 'tsyringe';
import { isPast, parseISO } from 'date-fns';

import AppError from '@shared/errors/AppError';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import ISubsidiaryRepository from '@modules/organizations/repositories/ISubsidiaryRepository';
import Sale from '@modules/sales/infra/typeorm/entities/Sale';
import { StatusInstallment } from '@modules/finances/infra/typeorm/entities/Installment';

interface IRequestDTO {
  id: string;
}

@injectable()
class UpdateSalesSubsidiary {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISaleRepository,

    @inject('SubsidiariesRepository')
    private subsidiariesRepository: ISubsidiaryRepository,
  ) {}

  public async execute({ id }: IRequestDTO): Promise<void> {
    const subsidiary = await this.subsidiariesRepository.findById(id);
    const sales = await this.salesRepository.findAllWithoutFilters();

    if (!subsidiary) {
      throw new AppError('subsidiary not found');
    }

    const filtredSales = sales.filter(
      sale => sale.subsidiary === null
    ).filter(sale => sale.users_directors[0].subsidiary.id === subsidiary.id)

    filtredSales.forEach(async sale => {
      await this.salesRepository.update(sale.id, {
        subsidiary: subsidiary
      })
    })

  }
}

export default UpdateSalesSubsidiary;
