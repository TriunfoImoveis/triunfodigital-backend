import { inject, injectable } from "tsyringe";
import { format, parseISO } from "date-fns";

import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";

interface IRequestRepository {
  state: string,
}
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

  public async execute({state}: IRequestRepository): Promise<IResponseDTO | undefined> {
    let sales = await this.salesRepository.findAllWithoutFilters();
    if (state.length > 0 ) {
      sales = sales.filter(item => item.realty.state === state)
    }

    const numberInBRL = (money: number): string => {
      const brl = money.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
      return brl;
    }

    const workSheetColumnNames = [
      { header: 'FILIAL', key: 'subsidiary', width: 10 },
      { header: 'TIPO DE VENDA', key: 'sale_type', width: 15 },
      { header: 'DATA DA VENDA', key: 'sale_date', width: 15, style: { numFmt: 'dd/mm/yyyy' } },
      { header: 'VALOR DA VENDA', key: 'sale_value', width: 20, style: { numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00' } },
      { header: '(%) VENDA', key: 'sale_percentage', width: 10, style: { numFmt: '0.00%' } },
      { header: 'COMISSÃO', key: 'commission', width: 15, style: { numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00' } },
      { header: 'BÔNUS', key: 'bonus', width: 15, style: { numFmt: '"R$"#,##0.00;[Red]\-"R$"#,##0.00' } },
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
      { header: 'TIPO DE PAGAMENTO', key: 'payment_type', width: 20 },
      { header: 'FORMA DE PAGAMENTO DA COMISSÃO', key: 'comission_payament', width: 50 },
    ]


    const data = sales.map((sale) => {
      const {client_seller, client_buyer, installments} = sale;

      var clientSeller_datebirth = null;
      var clientBuyer_datebirth = null;
      if (client_seller) {
        const {date_birth} = client_seller;
        clientSeller_datebirth = date_birth ? parseISO(date_birth.toString()) : null;
      }
      if (client_buyer) {
        const {date_birth} = client_buyer;
        clientBuyer_datebirth = date_birth ? parseISO(date_birth.toString()) : null;
      }

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

      installments.sort((a ,b) => {
        return a.installment_number - b.installment_number;
      });

      const comissionPaymentText = installments.map(installment => {
        const date = format(parseISO(installment.due_date.toString()), 'dd/MM/yy');
        return `${installment.installment_number}° parcela de ${numberInBRL(Number(installment.value))} com vencimento em ${date} e que está ${installment.status}`;
      }).join('; ');

      const sales = {
        subsidiary: subsidiary.subsidiary.city,
        sale_type: sale.sale_type,
        sale_date: parseISO(sale.sale_date.toString()),
        sale_value: Number(sale.realty_ammount),
        sale_percentage: sale.percentage_sale / 100,
        commission: Number(sale.commission),
        bonus: sale.bonus ? Number(sale.bonus) : null,
        value_signal: sale.value_signal ? Number(sale.value_signal) : null,
        pay_date_signal: sale.pay_date_signal ? parseISO(sale.pay_date_signal.toString()) : null,
        origin: sale.origin.name,
        property_type: sale.realty.property.name,
        realty: `${sale.realty.enterprise} - ${sale.realty.unit}`,
        neighborhood: sale.realty.neighborhood,
        builder: sale.builder ? sale.builder.name : null,
        client_seller_name: client_seller ? client_seller.name : null,
        client_seller_datebirth: clientSeller_datebirth,
        client_seller_email: client_seller ? client_seller.email : null,
        client_seller_phone: client_seller ? client_seller.phone : null,
        client_seller_occupation: client_seller ? client_seller.occupation : null,
        client_seller_civilStatus: client_seller ? client_seller.civil_status : null,
        client_buyer_name: client_buyer ? client_buyer.name : null,
        client_buyer_datebirth: clientBuyer_datebirth,
        client_buyer_email: client_buyer ? client_buyer.email : null,
        client_buyer_phone: client_buyer ? client_buyer.phone : null,
        client_buyer_occupation: client_buyer ? client_buyer.occupation : null,
        client_buyer_civilStatus: client_buyer ? client_buyer.civil_status : null,
        directors: directors.toString(),
        coordinator: sale.user_coordinator ? sale.user_coordinator.name : null,
        captivators: captivators.toString(),
        sellers: sellers.toString(),
        status: sale.status,
        payment_type: sale.payment_type.name,
        comission_payament: comissionPaymentText,
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
