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

    const {installments, totalInstallments} = await this.installmentsRepository.listFilters({
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

    const installmentRecived = await this.installmentsRepository.getAmountIntallmentsRecived({subisidiaries: subsidiary ? [subsidiary] : undefined, month, year, dateFrom, dateTo});

    const amountInCentsInstallmentRecived = installmentRecived.map(installment => Number(installment.value) * 100).reduce((total, value) => {
      return total + value
    }, 0)

    const amountInstallmentRecived = amountInCentsInstallmentRecived / 100;
    const installmentPay = await this.installmentsRepository.getAmountIntallmentsPay({subisidiaries: subsidiary ? [subsidiary] : undefined, month, year, dateFrom, dateTo});

    const amountInCentsInstallmentPay = installmentPay.map(installment => Number(installment.value) * 100).reduce((total, value) => {
      return total + value
    }, 0)

    const amountInstallmentPay = amountInCentsInstallmentPay / 100;

    return {installments, totalInstallments, amountInstallmentRecived, amountInstallmentPay};
  }
}

export default ListInstallmentService;
