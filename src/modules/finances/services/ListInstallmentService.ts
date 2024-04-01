import { inject, injectable } from 'tsyringe';

import IInstallmentRepository from '@modules/finances/repositories/IInstallmentRepository';
import IRequestInstallmentDTO from '@modules/finances/dtos/IRequestInstallmentDTO';
import IResponseInstallmentDTO from '../dtos/IResponseInstallmentDTO';

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
    dateTo,
    page,
    perPage
  }: IRequestInstallmentDTO): Promise<IResponseInstallmentDTO> {

    const {installments, totalInstallments, totalValueInstallments} = await this.installmentsRepository.listFilters({
      buyer_name,
      subsidiary,
      status,
      month,
      year,
      dateFrom,
      dateTo,
      perPage,
      page
    });


    return {installments, totalInstallments, totalValueInstallments};
  }
}

export default ListInstallmentService;
