import { inject, injectable } from "tsyringe";
import { parseISO } from "date-fns";

import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import IRevenueRepository from "@modules/finances/repositories/IRevenueRepository";
import calculate_tax_rate from "@shared/utils/calculate_tax_rate";
import verify_due_date from "@shared/utils/verify_due_date";
import { RevenueStatus } from "@modules/finances/infra/typeorm/entities/Revenue";

interface IResponseDTO {
  link_url: string;
}

@injectable()
class ExportRevenueService {
  constructor(
    @inject('RevenueRepository')
    private revenueRepository: IRevenueRepository,

    @inject('StorageProvider')
    private storagePrivider: IStorageProvider,
  ) { }

  public async execute(): Promise<IResponseDTO | undefined> {
    const revenues = await this.revenueRepository.list();

    const workSheetColumnNames = [
      { header: 'TIPO DE RECEITA', key: 'revenue_type', width: 15},
      { header: 'FILIAL', key: 'subsidiary', width: 15 },
      { header: 'DESCRIÇÃO', key: 'description', width: 30 },
      { header: 'VENCIMENTO', key: 'due_date', width: 15, style: {numFmt: 'dd/mm/yyyy'} },
      { header: 'VALOR BRUTO', key: 'value_integral', width: 15, style: {numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00'} },
      { header: 'TAXA DE IMPOSTO', key: 'tax_rate', width: 15, style: {numFmt: '0.00%'}},
      { header: 'VALOR LIQUIDO', key: 'value_liquid', width: 15, style: {numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00'} },
      { header: 'VALOR DA NOTA', key: 'invoice_value', width: 15, style: {numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00'} },
      { header: 'DATA DE PAGAMENTO', key: 'pay_date', width: 15, style: {numFmt: 'dd/mm/yyyy' } },
      { header: 'CONTA DE ENTRADA', key: 'bank_data', width: 20 },
      { header: 'CLIENTE', key: 'client', width: 20 },
      { header: 'STATUS', key: 'status', width: 15 },
    ]

    const data = revenues.map((revenue) => {
      return {
        revenue_type: revenue.revenue_type,
        subsidiary: revenue.subsidiary.city,
        description: revenue.description,
        due_date: parseISO(revenue.due_date.toString()),
        value_integral: Number(revenue.value_integral),
        tax_rate: revenue.tax_rate/100,
        value_liquid: calculate_tax_rate(revenue.value_integral, revenue.tax_rate),
        invoice_value: Number(revenue.invoice_value),
        pay_date: revenue.pay_date ? parseISO(revenue.pay_date.toString()) : null,
        bank_data: revenue.bank_data ? `AG: ${revenue.bank_data.agency} / CONTA: ${revenue.bank_data.account}` : null,
        client: revenue.client ? revenue.client : null,
        status: revenue.status === RevenueStatus.PEND ? verify_due_date(revenue.due_date) : revenue.status,
      }
    });

    const filePath = await this.storagePrivider.saveReportFile(
      { 
        workSheetData: {
          headers: workSheetColumnNames,
          data: data
        }, 
        fileName: 'revenues',
        refCol: "A1:L1"
      }
    );

    return {
      link_url: filePath
    };
  }
}

export default ExportRevenueService;
