import { inject, injectable } from "tsyringe";
import { format, parseISO } from "date-fns";

import ISaleRepository from "@modules/sales/repositories/ISaleRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { getProfessionName } from "@shared/utils/formated_strings";

interface IRequestRepository {
  subsidiaryId?: string,
  name?: string,
  status?: string,
  month?: string,
  year?: string
}
interface IResponseDTO {
  link_url: string;
}

interface InstallmentType {
  id: string;
  installment_number: Number;
  value: number;
  due_date: Date;
  status: string;
}

@injectable()
class ExportSaleService {
  constructor(
    @inject("SalesRepository")
    private salesRepository: ISaleRepository,

    @inject('StorageProvider')
    private storagePrivider: IStorageProvider,
  ) { }

  public async execute({subsidiaryId, month, year, name, status}: IRequestRepository): Promise<IResponseDTO | undefined> {
    let sales = await this.salesRepository.findAll({
      subsidiaryId,
      month,
      year,
      name,
      status
    });

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
      {header:  'CONTATO CONTRUTORA - TELEFONE', key: 'builder_contact_phone', width: 30},
      {header:  'CONTATO CONTRUTORA - EMAIL', key: 'builder_contact_email', width: 30},
      { header: 'CLIENTE VENDEDOR - NOME', key: 'client_seller_name', width: 20 },
      { header: 'CLIENTE VENDEDOR - ORIGEM', key: 'client_seller_origin', width: 20 },
      { header: 'CLIENTE VENDEDOR - DATA NASCIMENTO', key: 'client_seller_datebirth', width: 15, style: { numFmt: 'dd/mm/yyyy' } },
      { header: 'CLIENTE VENDEDOR - EMAIL', key: 'client_seller_email', width: 20 },
      { header: 'CLIENTE VENDEDOR - TELEFONE', key: 'client_seller_phone', width: 20 },
      { header: 'CLIENTE VENDEDOR - PROFISSAO', key: 'client_seller_occupation', width: 20 },
      { header: 'CLIENTE VENDEDOR - ESTADO CIVIL', key: 'client_seller_civilStatus', width: 20 },
      { header: 'CLIENTE COMPRADOR - NOME', key: 'client_buyer_name', width: 20 },
      { header: 'CLIENTE COMPRADOR - ORIGEM', key: 'client_buyer_origin', width: 20 },
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
      { header: '1º PARCELA', key: 'installment_value_0', width: 20, default: '-------------'},
      { header: '1º PARCELA DT PAG', key: 'installment_due_date_0', width: 20, default: '-------------'},
      { header: '2º PARCELA', key: 'installment_value_1', width: 20, default: '-------------'},
      { header: '2º PARCELA DT PAG', key: 'installment_due_date_1', width: 20, default: '-------------'},
      { header: '3º PARCELA', key: 'installment_value_2', width: 20, default: '-------------'},
      { header: '3º PARCELA DT PAG', key: 'installment_due_date_2', width: 20, default: '-------------'},
      { header: '4º PARCELA', key: 'installment_value_3', width: 20, default: '-------------'},
      { header: '4º PARCELA DT PAG', key: 'installment_due_date_3', width: 20, default: '-------------'},
      { header: '5º PARCELA', key: 'installment_value_4', width: 20, default: '-------------'},
      { header: '5º PARCELA DT PAG', key: 'installment_due_date_4', width: 20, default: '-------------'},
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

      const subsidiary = sale.subsidiary;

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

      let installmentFields = {};
      installments.forEach((installment, index) => {
        installmentFields = {
          ...installmentFields,
          [`installment_value_${index}`]: numberInBRL(Number(installment.value)),
          [`installment_due_date_${index}`]: format(parseISO(installment.due_date.toString()), 'dd/MM/yyyy'),
        }
      })

      const sales = {
        subsidiary: subsidiary ? subsidiary.name : '',
        sale_type: sale.sale_type,
        sale_date: parseISO(sale.sale_date.toString()),
        sale_value: Number(sale.realty_ammount),
        sale_percentage: sale.percentage_sale / 100,
        commission: Number(sale.commission),
        bonus: sale.bonus ? Number(sale.bonus) : null,
        value_signal: sale.value_signal ? Number(sale.value_signal) : null,
        pay_date_signal: sale.pay_date_signal ? parseISO(sale.pay_date_signal.toString()) : null,
        origin: sale.origin.name,
        property_type: sale.realty.property ? sale.realty.property.name : '',
        realty: `${sale.realty.enterprise} - ${sale.realty.unit}`,
        neighborhood: sale.realty.neighborhood,
        builder: sale.builder ? sale.builder.name : null,
        builder_contact_phone: sale.builder ? `${sale.builder.phone}`: null,
        builder_contact_email: sale.builder ? `${sale.builder.email}`: null,
        client_seller_name: client_seller ? client_seller.name : null,
        client_seller_origin: client_seller && client_seller.origin ? client_seller.origin.name : '',
        client_seller_datebirth: clientSeller_datebirth,
        client_seller_email: client_seller ? client_seller.email : null,
        client_seller_phone: client_seller ? client_seller.phone : null,
        client_seller_occupation: getProfessionName(client_seller),
        client_seller_civilStatus: client_seller ? client_seller.civil_status : null,
        client_buyer_name: client_buyer ? client_buyer.name : null,
        client_buyer_origin: client_buyer && client_buyer.origin ? client_buyer.origin.name : '',
        client_buyer_datebirth: clientBuyer_datebirth,
        client_buyer_email: client_buyer ? client_buyer.email : null,
        client_buyer_phone: client_buyer ? client_buyer.phone : null,
        client_buyer_occupation: getProfessionName(client_buyer),
        client_buyer_civilStatus: client_buyer ? client_buyer.civil_status : null,
        directors: directors.toString(),
        coordinator: sale.user_coordinator ? sale.user_coordinator.name : null,
        captivators: captivators.toString(),
        sellers: sellers.toString(),
        status: sale.status,
        payment_type: sale.payment_type.name,
        ...installmentFields,
      }

      return sales;
    });

    await this.storagePrivider.deleteFile('sales');

    const filePath = await this.storagePrivider.saveReportFile(
      {
        workSheetData: {
          headers: workSheetColumnNames,
          data: data
        },
        fileName: `sales-${new Date().getTime()}`,
        refCol: "A1:AF1"
      }
    );

    return {
      link_url: filePath
    };
  }
}

export default ExportSaleService;
