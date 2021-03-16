import { inject, injectable } from "tsyringe";
import * as xlsx from 'xlsx';
import path from 'path';

import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";

@injectable()
class ExportSaleService {
  constructor(
    @inject("SalesRepository")
    private salesRepository: ISaleRepository,

    @inject('StorageProvider')
    private storagePrivider: IStorageProvider,
  ) {}

  public async execute(): Promise<void> {
    const sales = await this.salesRepository.findAllWithoutFilters();

    const workSheetColumnNames = [
      "Filial", "Tipo de Venda", "Data da Venda", "Valor da Venda",
      "(%) Venda", "Comissão", "Bônus", "Tipo de Pagamento",
      "Valor do Sinal", "Data Pag. do Sinal", "Origem", "Imovel",
      "Construtora", "Cliente Comprador", "Diretores", "Coordenador",
      "Captadores", "Vendedores", "Status",
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
      
      return [
        subsidiary.subsidiary.city, sale.sale_type, sale.sale_date, sale.realty_ammount,
        sale.percentage_sale, sale.commission, sale.bonus, sale.payment_type.name,
        sale.value_signal, sale.pay_date_signal, sale.origin.name, sale.realty.enterprise,
        sale.builder?.name, sale.client_buyer.name, directors.toString(), sale.user_coordinator?.name,
        captivators.toString(), sellers.toString(), sale.status
      ]
    });
    
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
      workSheetColumnNames,
      ... data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    workSheet["!autofilter"] = {ref: "A1:S1"};
    xlsx.utils.book_append_sheet(workBook, workSheet, "sales");
    xlsx.writeFile(
      workBook, 
      path.resolve(
        __dirname, 
        '..', 
        '..',
        '..',
        '..',
        'tmp',
        'sales.xlsx'
      )
    );
  }
}

export default ExportSaleService;