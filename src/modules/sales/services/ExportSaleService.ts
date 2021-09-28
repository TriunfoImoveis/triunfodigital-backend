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
      { header: 'FILIAL', key: 'subsidiary', width: 10 },
      { header: 'TIPO DE VENDA', key: 'sale_type', width: 15 },
      { header: 'DATA DA VENDA', key: 'sale_date', width: 15, style: { numFmt: 'dd/mm/yyyy' } },
      { header: 'VALOR DA VENDA', key: 'sale_value', width: 20, style: { numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00' } },
      { header: '(%) VENDA', key: 'sale_percentage', width: 10, style: { numFmt: '0.00%' } },
      { header: 'COMISSÃO', key: 'commission', width: 15, style: { numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00' } },
      { header: 'BÔNUS', key: 'bonus', width: 15, style: { numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00' } },
      { header: 'TIPO DE PAGAMENTO', key: 'payment_type', width: 20 },
      { header: 'VALOR DO SINAL', key: 'value_signal', width: 15, style: { numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00' } },
      { header: 'DATA PAG. SINAL', key: 'pay_date_signal', width: 15, style: { numFmt: 'dd/mm/yyyy' } },
      { header: 'ORIGEM', key: 'origin', width: 15 },
      { header: 'TIPO DE IMOVEL', key: 'property_type', width: 15 },
      { header: 'IMOVEL / UNIDADE', key: 'realty', width: 20 },
      { header: 'BAIRRO', key: 'neighborhood', width: 20 },
      { header: 'CONSTRUTORA', key: 'builder', width: 15 },
      { header: 'CLIENTE VENDEDOR - NOME', key: 'client_seller_name', width: 20 },
      { header: 'CLIENTE VENDEDOR - DATA NASCIMENTO', key: 'client_seller_datebirth', width: 15, style: { numFmt: 'dd/mm/yyyy' } },
      { header: 'CLIENTE VENDEDOR - EMAIL', key: 'client_seller_email', width: 20 },
      { header: 'CLIENTE VENDEDOR - TELEFONE', key: 'client_seller_phone', width: 20 },
      { header: 'CLIENTE VENDEDOR - PROFISSAO', key: 'client_seller_occupation', width: 20 },
      { header: 'CLIENTE VENDEDOR - ESTADO CIVIL', key: 'client_seller_civilStatus', width: 20 },
      { header: 'CLIENTE COMPRADOR - NOME', key: 'client_buyer_name', width: 20 },
      { header: 'CLIENTE COMPRADOR - DATA NASCIMENTO', key: 'client_buyer_datebirth', width: 15, style: { numFmt: 'dd/mm/yyyy' } },
      { header: 'CLIENTE COMPRADOR - EMAIL', key: 'client_buyer_email', width: 20 },
      { header: 'CLIENTE COMPRADOR - TELEFONE', key: 'client_buyer_phone', width: 20 },
      { header: 'CLIENTE COMPRADOR - PROFISSAO', key: 'client_buyer_occupation', width: 20 },
      { header: 'CLIENTE COMPRADOR - ESTADO CIVIL', key: 'client_buyer_civilStatus', width: 20 },
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
        sale_percentage: sale.percentage_sale / 100,
        commission: Number(sale.commission),
        bonus: sale.bonus ? Number(sale.bonus) : null,
        payment_type: sale.payment_type.name,
        value_signal: sale.value_signal ? Number(sale.value_signal) : null,
        pay_date_signal: sale.pay_date_signal ? parseISO(sale.pay_date_signal.toString()) : null,
        origin: sale.origin.name,
        property_type: sale.realty.property.name,
        realty: `${sale.realty.enterprise} - ${sale.realty.unit}`,
        neighborhood: sale.realty.neighborhood,
        builder: sale.builder?.name,
        client_seller_name: sale.client_seller?.name,
        client_seller_datebirth: sale.client_seller?.date_birth ? parseISO(sale.client_seller.date_birth.toString()) : null,
        client_seller_email: sale.client_seller?.email,
        client_seller_phone: sale.client_seller?.phone,
        client_seller_occupation: sale.client_seller?.occupation,
        client_seller_civilStatus: sale.client_seller?.civil_status,
        client_buyer_name: sale.client_buyer?.name,
        client_buyer_datebirth: sale.client_buyer?.date_birth ? parseISO(sale.client_buyer.date_birth.toString()) : null,
        client_buyer_email: sale.client_buyer?.email,
        client_buyer_phone: sale.client_buyer?.phone,
        client_buyer_occupation: sale.client_buyer?.occupation,
        client_buyer_civilStatus: sale.client_buyer?.civil_status,
        directors: directors.toString(),
        coordinator: sale.user_coordinator?.name,
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
        refCol: "A1:V1"
      }
    );

    return {
      link_url: filePath
    };
  }
}

export default ExportSaleService;
