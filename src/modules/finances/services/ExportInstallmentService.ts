import { inject, injectable } from "tsyringe";
import { parseISO } from "date-fns";

import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import verify_due_date from "@shared/utils/verify_due_date";
import IInstallmentRepository from "@modules/finances/repositories/IInstallmentRepository";
import { StatusInstallment } from "@modules/finances/infra/typeorm/entities/Installment";

interface IResponseDTO {
  link_url: string;
}

@injectable()
class ExportInstallmentService {
  constructor(
    @inject('InstallmentsRepository')
    private installmentsRepository: IInstallmentRepository,

    @inject('StorageProvider')
    private storagePrivider: IStorageProvider,
  ) { }

  public async execute(): Promise<IResponseDTO | undefined> {
    const installments = await this.installmentsRepository.listFilters({
      buyer_name: '',
      city: '',
      status: ["PENDENTE", "VENCIDO", "PAGO", "CAIU"]
    });
    
    const workSheetColumnNames = [
      { header: 'FILIAL', key: 'subsidiary', width: 15 },
      { header: 'VENCIMENTO', key: 'due_date', width: 15, style: {numFmt: 'dd/mm/yyyy'} },
      { header: 'DESCRIÇÃO', key: 'description', width: 30 },
      { header: 'VALOR', key: 'value', width: 15, style: {numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00'} },
      { header: 'CORRETORES', key: 'sellers', width: 20 },
      { header: 'STATUS', key: 'status', width: 15 },
    ]

    const data = installments.map((i) => {
      const subsidiary = i.sale.sale_has_sellers.reduce((seller) => {
        return seller;
      });

      const sellers = i.sale.sale_has_sellers.map((seller) => {
        return seller.name;
      });

      const description = `${i.installment_number}º Parcela - ${i.sale.realty.enterprise}`;

      return {
        subsidiary: subsidiary.subsidiary.city,
        due_date: parseISO(i.due_date.toString()),
        description: description,
        value: Number(i.value),
        sellers: sellers.toString(),
        status: i.status === StatusInstallment.PEN ? verify_due_date(i.due_date) : i.status,
      }
    });

    const filePath = await this.storagePrivider.saveReportFile(
      { 
        workSheetData: {
          headers: workSheetColumnNames,
          data: data
        }, 
        fileName: 'installments',
        refCol: "A1:F1"
      }
    );

    return {
      link_url: filePath
    };
  }
}

export default ExportInstallmentService;
