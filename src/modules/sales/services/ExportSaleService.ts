import { inject, injectable } from "tsyringe";
import {format, parseISO} from "date-fns";

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
      const realty_ammount = sale.realty_ammount.toString().replace(".", ",");
      const commission = sale.commission.toString().replace(".", ",");
      const value_signal = sale.value_signal ? sale.value_signal.toString().replace(".", ",") : null;
      const bonus = sale.bonus ? sale.bonus.toString().replace(".", ",") : null;
      
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

    const workSheetData = [
      workSheetColumnNames,
      ... data
    ];
    
    const filePath = await this.storagePrivider.saveReportFile(
      { 
        workSheetData, 
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
