import { inject, injectable } from 'tsyringe';
import { differenceInYears } from 'date-fns';

import IRequestMKTDashboardDTO from '@modules/dashboards/dtos/IRequestMKTDashboardDTO';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';

@injectable()
class SellersDashboardService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISaleRepository,
  ) {}

  public async execute(): Promise<IRequestMKTDashboardDTO> {
    const sales_sellers = await this.salesRepository.findAllWithoutFilters();

    const mktSales = sales_sellers.map(sale => {
      const directores = sale.users_directors ? sale.users_directors.map(director => director.name).join(',') : '';
      const captivators = sale.sale_has_captivators ? sale.sale_has_captivators.map(captivator => captivator.name).join(',') : '';
      const selers =  sale.sale_has_sellers ? sale.sale_has_sellers.map(seller => seller.name).join(',') : '';
      return {
        'FILIAL': sale.realty.city,
        'TIPO DE VENDA': sale.sale_type,
        'DATA DA VENDA': sale.sale_date,
        'VALOR DA VENDA': sale.realty_ammount,
        '(%) VENDA': sale.percentage_sale,
        'COMISSAO': sale.commission,
        'BONUS': sale.bonus || 0,
        'VALOR DO SINAL': sale.value_signal || '',
        'DATA PAG SINAL': sale.pay_date_signal || '',
        'ORIGEM':  sale.origin ? sale.origin.name : '',
        'TIPO IMOVEL': sale.realty.property.name,
        'IMOVEL/UNIDADE': `${sale.realty.enterprise}-${sale.realty.unit}`,
        'BAIRRO': sale.realty.neighborhood,
        'CONSTRUTORA': sale.builder ? sale.builder.name : '',
        'CLIENTE VENDEDOR - NOME': sale.client_seller ? sale.client_seller.name : '',
        'CLIENTE VENDEDOR - DATA DE NASCIMENTO': sale.client_seller ? sale.client_seller.date_birth : '',
        'CLIENTE VENDEDOR - EMAIL': sale.client_seller ? sale.client_seller.email : '',
        'CLIENTE VENDEDOR - TELEFONE': sale.client_seller ? sale.client_seller.phone : '',
        'CLIENTE VENDEDOR - PROFISSAO': sale.client_seller ? sale.client_seller.occupation : '',
        'CLIENTE VENDEDOR - ESTADO CIVIL': sale.client_seller ? sale.client_seller.civil_status : '',
        'CLIENTE COMPRADOR - NOME': sale.client_buyer.name,
        'CLIENTE COMPRADOR - DATA DE NASCIMENTO': sale.client_buyer.date_birth,
        'CLIENTE COMPRADOR - EMAIL': sale.client_buyer.email,
        'CLIENTE COMPRADOR - TELEFONE': sale.client_buyer.phone,
        'CLIENTE COMPRADOR - PROFISSAO': sale.client_buyer.occupation,
        'CLIENTE COMPRADOR - ESTADO CIVIL': sale.client_buyer.civil_status,
        'DIRETORES': directores,
        'COOREDENADOR': sale.user_coordinator ? sale.user_coordinator.name : '',
        'CAPTADORES': captivators,
        'VENDEDORES': selers,
        'SATUS': sale.status,
        'TIPO PAGAMENTO': sale.payment_type.name,
        '1º PARCELA': sale.installments[0] ? sale.installments[0].value : '',
        '1º PARCELA DT PAG': sale.installments[0] ? sale.installments[0].pay_date : '',
        '2º PARCELA': sale.installments[1]? sale.installments[1].value : '',
        '2º PARCELA DT PAG': sale.installments[1] ? sale.installments[1].pay_date : '',
        '3º PARCELA': sale.installments[2] ? sale.installments[2].value : '',
        '3º PARCELA DT PAG': sale.installments[2] ? sale.installments[2].pay_date : '',
        '4º PARCELA': sale.installments[3] ? sale.installments[3].value : '',
        '4º PARCELA DT PAG': sale.installments[3] ? sale.installments[3].pay_date : '',
        '5º PARCELA': sale.installments[4] ? sale.installments[4].value : '',
        '5º PARCELA DT PAG': sale.installments[4] ? sale.installments[4].pay_date : '',
      }
    })

    return {
      mktSales
    }
  }
}

export default SellersDashboardService;
