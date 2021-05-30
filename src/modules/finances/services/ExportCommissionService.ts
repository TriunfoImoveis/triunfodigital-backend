import { inject, injectable } from "tsyringe";
import { parseISO } from "date-fns";

import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import IComissionRepository from "@modules/finances/repositories/IComissionRepository";

interface IResponseDTO {
  link_url: string;
}

@injectable()
class ExportInstallmentService {
  constructor(
    @inject('ComissionRepository')
    private comissionRepository: IComissionRepository,

    @inject('StorageProvider')
    private storagePrivider: IStorageProvider,
  ) {}

  public async execute(): Promise<IResponseDTO | undefined> {
    const commissions = await this.comissionRepository.list();
    
    const workSheetColumnNames = [
      { header: 'FILIAL', key: 'subsidiary', width: 10 },
      { header: 'DATA DE PAGAMENTO', key: 'pay_date', width: 20, style: {numFmt: 'dd/mm/yyyy'} },
      { header: 'CORRETOR', key: 'seller', width: 20 },
      { header: 'DESCRIÇÃO', key: 'description', width: 40 },
      { header: 'VALOR BRUTO', key: 'value_integral', width: 15, style: {numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00'} },
      { header: '% DE IMPOSTO', key: 'percentage_rate', width: 15, style: {numFmt: '0.00%'}},
      { header: 'VALOR LIQUIDO', key: 'value_liquid', width: 15, style: {numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00'} },
      { header: 'CONTA DE SAIDA', key: 'bank_data', width: 30 },
    ]

    const data = commissions.map((commission) => {
      const installment = commission.calculation.installment;

      const description = `${installment.installment_number}º Parcela / ${installment.sale.realty.enterprise} - ${installment.sale.realty.unit}`;

      return {
        subsidiary: commission.user.subsidiary.city,
        pay_date: parseISO(commission.calculation.pay_date.toString()),
        seller: commission.user.name,
        description: description,
        value_integral: commission.comission_integral ? Number(commission.comission_integral) : null,
        percentage_rate: commission.tax_percentage ? (commission.tax_percentage/100) : null,
        value_liquid: commission.comission_liquid ? Number(commission.comission_liquid) : null,
        bank_data: `AG: ${commission.calculation.bank_data.agency} / CONTA: ${commission.calculation.bank_data.account}`,
      }
    });

    const filePath = await this.storagePrivider.saveReportFile(
      { 
        workSheetData: {
          headers: workSheetColumnNames,
          data: data
        }, 
        fileName: 'commissions',
        refCol: "A1:H1"
      }
    );

    return {
      link_url: filePath
    };
  }
}

export default ExportInstallmentService;
