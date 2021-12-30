import { inject, injectable } from 'tsyringe';

import IRequestSellersDashboardDTO from '@modules/dashboards/dtos/IRequestSellersDashboardDTO';
import IResponseSellersDashboardDTO from '@modules/dashboards/dtos/IResponseSellersDashboardDTO';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import IOriginRepository from '@modules/sales/repositories/IOriginRepository';
import IPropertyRepository from '@modules/sales/repositories/IPropertyRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IComissionRepository from '@modules/finances/repositories/IComissionRepository';
import { calculate_vgv } from '@shared/utils/calculate_vgv';

@injectable()
class SellersDashboardService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISaleRepository,

    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('ComissionRepository')
    private comissionRepository: IComissionRepository,

    @inject('OriginsRepository')
    private originsRepository: IOriginRepository,

    @inject('PropertiesRepository')
    private propertyRepository: IPropertyRepository,
  ) {}

  public async execute({
    corretor,
    ano,
  }: IRequestSellersDashboardDTO): Promise<IResponseSellersDashboardDTO> {
    const ano_formated = ano.toString();
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

    // Calculo VGV para corretor vendedor.
    const sales_sellers = await this.salesRepository.salesForUserSellers(
      corretor, 
      "yyyy", 
      ano_formated
    );
    const vgv_sellers = await calculate_vgv(sales_sellers);
    const vgv_sellers_for_month = await Promise.all(
      months.map(async month => {
        const sales = await this.salesRepository.salesForUserSellers(
          corretor, 
          "yyyyMM", 
          ano_formated+month,
        );
        const vgv = await calculate_vgv(sales);
        return {
          month: month,
          vgv: vgv,
        };
      })
    );

    // Calculo VGV para corretor captador.
    const sales_captivators = await this.salesRepository.salesForUserCaptivators(
      corretor, 
      "yyyy", 
      ano_formated
    );
    const vgv_captivators = await calculate_vgv(sales_captivators);
    const vgv_captivators_for_month = await Promise.all(
      months.map(async month => {
        const sales = await this.salesRepository.salesForUserCaptivators(
          corretor, 
          "yyyyMM", 
          ano_formated+month,
        );
        const vgv = await calculate_vgv(sales);
        return {
          month: month,
          vgv: vgv,
        };
      })
    );

    const ticket_medium_sales = Number((vgv_sellers/12).toFixed(2));
    const ticket_medium_captivators = Number((vgv_captivators/12).toFixed(2));

    // Calculo de Comissões
    const comissions = await this.comissionRepository.findByUser(
      corretor, 
      ano_formated,
    );

    var total_comissions = 0;
    comissions.forEach(
      comission => total_comissions += Number(comission.comission_liquid)
    );


    // Vendas
    const sales = await this.salesRepository.salesForDashboard(corretor, ano_formated);
    
    // status
    const sales_nao_validado = sales.filter(sale => sale.status === "NAO_VALIDADO");
    const sales_caiu = sales.filter(sale => sale.status === "CAIU");
    const sales_pendente = sales.filter(sale => sale.status === "PENDENTE");
    const sales_pago_total = sales.filter(sale => sale.status === "PAGO_TOTAL");

    // tipo de venda
    const sales_paid = [...sales_pendente, ...sales_pago_total]
    const type_new = sales_paid.filter(sale => sale.sale_type === "NOVO").length;
    const type_used = sales_paid.filter(sale => sale.sale_type === "USADO").length;

    // origem da venda
    const origins = await this.originsRepository.findAll();
    const origin_sales = origins.map(origin => {
      let total = 0;
      sales_paid.filter(
        sale => sale?.origin.id === origin.id
      ).forEach(sale => total += Number(sale.realty_ammount));
      return { 
        origin: origin.name,
        value: total,
      }
    });

    // tipo de imovel
    const properties = await this.propertyRepository.findAll();
    const properties_sales = properties.map(property => {
      const quantity = sales_paid.filter(
        sale => sale?.realty?.property.id === property.id
      ).length;
      return { 
        property: property.name,
        quantity: quantity,
      }
    });


    return {
      quantity: {
        sales: sales_sellers.length,
        captivators: sales_captivators.length,
      },
      ticket_medium: {
        sales: ticket_medium_sales,
        captivators: ticket_medium_captivators,
      },
      comission: total_comissions,
      vgv: {
        sales: {
          total: vgv_sellers,
          months: vgv_sellers_for_month,
        },
        captivators: {
          total: vgv_captivators,
          months: vgv_captivators_for_month,
        },
      },
      sales: {
        status: {
          nao_validado: sales_nao_validado.length,
          caiu: sales_caiu.length,
          pendente: sales_pendente.length,
          pago_total: sales_pago_total.length,
        },
        types: {
          new: type_new,
          used: type_used,
        },
        origins: origin_sales,
        properties: properties_sales,
      }
    }
  }
}

export default SellersDashboardService;