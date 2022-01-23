import { inject, injectable } from 'tsyringe';
import { differenceInYears } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IRequestSellersDashboardDTO from '@modules/dashboards/dtos/IRequestSellersDashboardDTO';
import IResponseSellersDashboardDTO from '@modules/dashboards/dtos/IResponseSellersDashboardDTO';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import IOriginRepository from '@modules/sales/repositories/IOriginRepository';
import IPropertyRepository from '@modules/sales/repositories/IPropertyRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IComissionRepository from '@modules/finances/repositories/IComissionRepository';
import { calculate_vgv } from '@shared/utils/calculate_vgv';
import formated_strings from '@shared/utils/formated_strings';

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

    const user = await this.usersRepository.findById(corretor);
    if (!user) {
      throw new AppError("Usuário não encontrado!", 404);
    }

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
    const sales_paid = [...sales_pendente, ...sales_pago_total]
    const QUANTITY_SALES = sales_paid.length;

    // tipo de venda
    const quantity_new = sales_paid.filter(sale => sale.sale_type === "NOVO").length;
    const percentage_new = Number(((quantity_new/QUANTITY_SALES)*100).toFixed(2));
    const quantity_used = sales_paid.filter(sale => sale.sale_type === "USADO").length;
    const percentage_used = Number(((quantity_used/QUANTITY_SALES)*100).toFixed(2));

    // origem da venda
    const origins = await this.originsRepository.findAll();
    const origin_sales = origins.map(origin => {
      let total = 0;
      sales_paid.filter(
        sale => sale.origin.id === origin.id
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
        sale => sale.realty.property.id === property.id
      ).length;
      const percentage = (quantity / QUANTITY_SALES)*100;
      return { 
        property: property.name,
        quantity: Number(percentage.toFixed(2)),
      }
    });

    // Por Bairro
    const all_neighborhoods = sales_paid.map(sale => formated_strings(sale.realty.neighborhood));
    const neighborhoods = all_neighborhoods.filter(
      (neighbor, index) => all_neighborhoods.indexOf(neighbor) === index
    ).sort();

    const quantity_neighborhoods = neighborhoods.map(neighbor => {
      const quantity = sales_paid.filter(
        sale => formated_strings(sale.realty.neighborhood) === neighbor
      ).length;

      return {
        neighborhood: neighbor,
        quantity: quantity
      }
    }).sort((a ,b) => b.quantity - a.quantity);

    /* perfil do cliente comprador */
    // GENERO
    const genders = ["FEMININO", "MASCULINO", "OUTRO"].map(
      gender => {
        const quantity = sales_paid.filter(
          sale => sale.client_buyer.gender === gender
        ).length;
        const percentage = (quantity / QUANTITY_SALES)*100;
        return {
          gender: gender,
          percentage: Number(percentage.toFixed(2)),
        }
      })

    // Estado Civil
    const civil_status = ["CASADO(A)", "DIVORCIADO(A)", "SOLTEIRO(A)", "VIUVO(A)"].map(
      status => {
        const quantity = sales_paid.filter(
          sale => sale.client_buyer.civil_status === status
        ).length;
        const percentage = (quantity/QUANTITY_SALES)*100;
        return {
          status: status,
          percentage: Number(percentage.toFixed(2)),
        }
      })

    // Número de filhos
    const sum_number_childrens = sales_paid.map(
      sale => sale.client_buyer.number_children
    ).reduce(
      (total, children) => total += children
    , 0);
    const avg_number_childrens = Number((sum_number_childrens/QUANTITY_SALES).toFixed(0));

    // Faixa Etaria
    const list_age_groups = [
      { age_group: "0-18", min: 0, max: 18 }, 
      { age_group: "19-39", min: 19, max: 39 }, 
      { age_group: "40-59", min: 40, max: 59 }, 
      { age_group: "+60", min: 60, max: 150 },
    ]

    const age_groups = list_age_groups.map(age_group => {
      const quantity = sales_paid.filter(
        sale => {
          const age = differenceInYears(new Date(sale.sale_date), new Date(sale.client_buyer.date_birth));
          if (age >= age_group.min && age <= age_group.max) {
            return age;
          }
        }
      ).length;
      const percentage = (quantity/QUANTITY_SALES)*100;
      return {
        age: age_group.age_group,
        percentage: Number(percentage.toFixed(2)),
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
          new: percentage_new,
          used: percentage_used,
        },
        origins: origin_sales,
        properties: properties_sales,
        neighborhoods: quantity_neighborhoods,
      },
      client: {
        genders: genders,
        civil_status: civil_status,
        avg_number_children: avg_number_childrens,
        age_groups: age_groups,
      },
    }
  }
}

export default SellersDashboardService;