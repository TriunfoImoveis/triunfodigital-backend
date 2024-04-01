import { inject, injectable } from 'tsyringe';

import IInstallmentRepository from '@modules/finances/repositories/IInstallmentRepository';
import IRequestGetInstallmentsEntryDTO from '../dtos/IResquestGetInstallmentEntryDTO';
import IResponseInstallmentEntryDTO from '../dtos/IResponseInstallmentEntryDTO';

@injectable()
class InstallmentsEntryService {
  constructor(
    @inject('InstallmentsRepository')
    private installmentsRepository: IInstallmentRepository,
  ) { }

  public async execute({
    buyer_name,
    subsidiary,
    month,
    year,
    dateFrom,
    dateTo,
    page,
    perPage,
    sort
  }: IRequestGetInstallmentsEntryDTO): Promise<IResponseInstallmentEntryDTO> {

    const { installments, totalInstallments, totalValueInstallments } = await this.installmentsRepository.getInstallmentsEntry({
      buyer_name,
      subsidiary,
      month,
      year,
      dateFrom,
      dateTo,
      perPage,
      page,
      sort
    });

    const entry = installments?.map(installment => {
      return {
        id: installment.id,
        pay_date: installment.calculation.pay_date,
        subsidiary: installment.sale.subsidiary.name,
        description: `${installment.installment_number}° Parcela - ${installment.sale.realty.enterprise}`,
        paying_source: `${installment.sale.sale_type === 'NOVO'
          ? installment.sale?.builder?.name
          : installment.sale.client_buyer.name
          }`,
        brute_value: installment.value,
        tax_rate: installment.calculation.tax_rate_nf
          ? installment.calculation.tax_rate_nf
          : null,
        value_note: installment.calculation.note_value
          ? installment.calculation.note_value
          : null,
        empressBrute: installment.calculation.participants?.find(participant => participant?.participant_type === 'EMPRESA')?.comission_integral || 0,
        empressLiquid: installment.calculation.participants?.find(participant => participant?.participant_type === 'EMPRESA')?.comission_liquid || 0,
        bank: installment.calculation.bank_data
          ? `${installment.calculation.bank_data.account}`
          : null
      }
    })



    return { entry, totalInstallments, totalValueInstallments };
  }
}

export default InstallmentsEntryService;
