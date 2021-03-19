import { inject, injectable } from "tsyringe";
import * as xlsx from 'xlsx';
import path from 'path';
import {format, parseISO} from "date-fns";

import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import reportConfig from '@config/reports';

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
  ) {}

  public async execute(): Promise<IResponseDTO | undefined> {
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

      const builder = sale.builder ? sale.builder.name : null;
      const coordinator = sale.user_coordinator ? sale.user_coordinator.name : null;

      const sale_date = format(parseISO(sale.sale_date.toString()), 'dd/MM/yyyy');
      const pay_date_signal = sale.pay_date_signal ? format(parseISO(sale.pay_date_signal.toString()), 'dd/MM/yyyy') : null;
      const percentage_sale = sale.percentage_sale.toString().replace(".", ",");
      const realty_ammount = Number(sale.realty_ammount).toLocaleString(
        'pt-BR', 
        { 
          style: 'currency', 
          currency: 'BRL' 
        }
      );
      const commission = Number(sale.commission).toLocaleString(
        'pt-BR', 
        { 
          style: 'currency', 
          currency: 'BRL' 
        }
      );
      const value_signal = sale.value_signal ? Number(sale.value_signal).toLocaleString(
        'pt-BR', 
        { 
          style: 'currency', 
          currency: 'BRL' 
        }
      ) : null;
      const bonus = sale.bonus ? Number(sale.bonus).toLocaleString(
        'pt-BR', 
        { 
          style: 'currency', 
          currency: 'BRL' 
        }
      ) : null;

      const sales = [
        subsidiary.subsidiary.city, 
        sale.sale_type, 
        sale_date, 
        realty_ammount,
        percentage_sale, 
        commission, 
        bonus, 
        sale.payment_type.name,
        value_signal, 
        pay_date_signal, 
        sale.origin.name, 
        sale.realty.enterprise,
        builder, 
        sale.client_buyer.name, 
        directors.toString(), 
        coordinator,
        captivators.toString(), 
        sellers.toString(), 
        sale.status
      ]

      return sales;
    });

    const workBook = xlsx.utils.book_new();
    const workSheetData = [
      workSheetColumnNames,
      ... data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    workSheet["!autofilter"] = {ref: "A1:S1"};

    const fileName = 'sales';
    const originalPath = path.resolve(reportConfig.tmpFolder, `${fileName}.xlsx`);

    xlsx.utils.book_append_sheet(workBook, workSheet, fileName);
    xlsx.writeFile(
      workBook,
      originalPath
    );
    
    await this.storagePrivider.saveReportFile(originalPath);

    switch (reportConfig.driver) {
      case 'disk':
        return {
          link_url: originalPath
        };
      case 's3':
        return {
          link_url: `https://${reportConfig.config.aws.bucket}.s3.amazonaws.com/${fileName}`
        };
      default:
        return undefined;
    }
  }
}

export default ExportSaleService;
