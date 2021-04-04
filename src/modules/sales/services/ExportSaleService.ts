import { inject, injectable } from "tsyringe";
import { format, parseISO } from "date-fns";

import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";

interface IResponseDTO {
  link_url: string;
}

@injectable()
class ExportSaleService {
  constructor(
    @inject("SalesRepository")
    private salesRepository: ISaleRepository,

    @inject('StorageProvider')
    private storagePrivider: IStorageProvider,
  ) { }

  public async execute(): Promise<IResponseDTO | undefined> {
    const sales = await this.salesRepository.findAllWithoutFilters();

    const workSheetColumnNames = [
      { header: 'FILIAL', key: 'subsidiary', width: 10},
      { header: 'TIPO DE VENDA', key: 'sale_type', width: 15 },
      { header: 'DATA DA VENDA', key: 'sale_date', width: 15, style: {numFmt: 'dd/mm/yyyy'} },
      { header: 'VALOR DA VENDA', key: 'sale_value', width: 20, style: {numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00'} },
      { header: '(%) VENDA', key: 'sale_percentage', width: 10, style: {numFmt: '0.00%'}},
      { header: 'COMISSÃO', key: 'commission', width: 15, style: {numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00'} },
      { header: 'BÔNUS', key: 'bonus', width: 15, style: {numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00'} },
      { header: 'TIPO DE PAGAMENTO', key: 'payment_type', width: 20 },
      { header: 'VALOR DO SINAL', key: 'value_signal', width: 15, style: {numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00'} },
      { header: 'DATA PAG. SINAL', key: 'pay_date_signal', width: 15, style: {numFmt: 'dd/mm/yyyy'} },
      { header: 'ORIGEM', key: 'origin', width: 15 },
      { header: 'IMOVEL', key: 'realty', width: 15 },
      { header: 'CONSTRUTORA', key: 'builder', width: 15 },
      { header: 'CLIENTE COMPRADOR', key: 'client_buyer', width: 20 },
      { header: 'DIRETORES', key: 'directors', width: 20 },
      { header: 'COORDENADOR', key: 'coordinator', width: 20 },
      { header: 'CAPTADORES', key: 'captivators', width: 15 },
      { header: 'VENDEDORES', key: 'sellers', width: 20 },
      { header: 'STATUS', key: 'status', width: 15 },
    ]

    const data = sales.map((sale) => {
      const subsidiary = sale.sale_has_sellers.reduce((seller) => {
        return seller;
      });

      const directors = sale.users_directors.map((director) => {
        return director.name;
      });

      const captivators = sale.sale_has_captivators.map((captivator) => {
        return captivator.name;
      });

      const sellers = sale.sale_has_sellers.map((seller) => {
        return seller.name;
      });
      
      const sales = {
        subsidiary: subsidiary.subsidiary.city,
        sale_type: sale.sale_type,
        sale_date: parseISO(sale.sale_date.toString()),
        sale_value: Number(sale.realty_ammount),
        sale_percentage: sale.percentage_sale/100,
        commission: Number(sale.commission),
        bonus: sale.bonus ? Number(sale.bonus) : null,
        payment_type: sale.payment_type.name,
        value_signal: sale.value_signal ? Number(sale.value_signal) : null,
        pay_date_signal: sale.pay_date_signal ? parseISO(sale.pay_date_signal.toString()) : null,
        origin: sale.origin.name,
        realty: sale.realty.enterprise,
        builder: sale.builder ? sale.builder.name : null,
        client_buyer: sale.client_buyer.name,
        directors: directors.toString(),
        coordinator: sale.user_coordinator ? sale.user_coordinator.name : null,
        captivators: captivators.toString(),
        sellers: sellers.toString(),
        status: sale.status
      }

      return sales;
    });

    const filePath = await this.storagePrivider.saveReportFile(
      { 
        workSheetData: {
          headers: workSheetColumnNames,
          data: data
        }, 
        fileName: 'sales',
        refCol: "A1:S1"
      }
    );

    return {
      link_url: filePath
    };
  }
}

export default ExportSaleService;
