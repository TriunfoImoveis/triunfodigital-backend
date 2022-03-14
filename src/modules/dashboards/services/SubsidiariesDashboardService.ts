import { inject, injectable } from 'tsyringe';
import { differenceInYears } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IRequestSubsidiariesDashboardDTO from '@modules/dashboards/dtos/IRequestSubsidiariesDashboardDTO';
import IResponseSubsidiariesDashboardDTO from '@modules/dashboards/dtos/IResponseSubsidiariesDashboardDTO';
import ISubsidiaryRepository from '@modules/organizations/repositories/ISubsidiaryRepository';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import IComissionRepository from '@modules/finances/repositories/IComissionRepository';
import IOriginRepository from '@modules/sales/repositories/IOriginRepository';
import IPropertyRepository from '@modules/sales/repositories/IPropertyRepository';
import formated_strings from '@shared/utils/formated_strings';


@injectable()
class SubsidiariesDashboardService {
  constructor(
    @inject('SubsidiariesRepository')
    private subsidiariesRepository: ISubsidiaryRepository,

    @inject('SalesRepository')
    private salesRepository: ISaleRepository,

    @inject('ComissionRepository')
    private comissionRepository: IComissionRepository,

    @inject('OriginsRepository')
    private originsRepository: IOriginRepository,

    @inject('PropertiesRepository')
    private propertyRepository: IPropertyRepository,
  ) {}

  public async execute({
    subsidiary,
    year,
  }: IRequestSubsidiariesDashboardDTO): Promise<IResponseSubsidiariesDashboardDTO> {
    const year_formated = year.toString();
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

    const subsidiary_exists = await this.subsidiariesRepository.findById(subsidiary);
    if (!subsidiary_exists) {
      throw new AppError("Filial não encontrada!", 404);
    }

    const sales = await this.salesRepository.salesForSubsidiary(subsidiary, "yyyy", year_formated);

    // status
    const sales_nao_validado = sales.filter(sale => sale.status === "NAO_VALIDADO");
    const sales_caiu = sales.filter(sale => sale.status === "CAIU");
    const sales_pendente = sales.filter(sale => sale.status === "PENDENTE");
    const sales_pago_total = sales.filter(sale => sale.status === "PAGO_TOTAL");
    const sales_paid = [...sales_pendente, ...sales_pago_total]
    const QUANTITY_SALES = sales_paid.length;
    
    // Vgv
    const vgv_total = sales_paid.map(
      sale => sale.realty_ammount
    ).reduce(
      (total, realty_ammount) => total += Number(realty_ammount)
    , 0);

    // Ticket Medio
    const ticket_medium = Number((vgv_total/12).toFixed(2));

    // Comissão
    const comissions = await this.comissionRepository.findBySubsidiary(
      subsidiary,
      "yyyy", 
      year_formated,
    );
    const total_comissions = comissions.reduce(
      (total, comission) => total += Number(comission.comission_liquid), 0
    );
    const comissions_for_month = await Promise.all(
      months.map(async month => {
        const comissions = await this.comissionRepository.findBySubsidiary(
          subsidiary, 
          "yyyyMM",
          year_formated+month,
        );

        const total_comission = comissions.reduce(
          (total, comission) => total += Number(comission.comission_liquid), 
        0);

        return {
          month: month,
          comission: total_comission
        };
      })
    );

    // Vgv por mes
    const vgv_for_month = await Promise.all(
      months.map(async month => {
        const sales = await this.salesRepository.salesForSubsidiary(
          subsidiary, 
          "yyyyMM", 
          year_formated+month,
        );
        const vgv = sales
          .filter(sale => ["PENDENTE", "PAGO_TOTAL"].includes(sale.status))
          .map(sale => sale.realty_ammount)
          .reduce((total, realty_ammount) => total += Number(realty_ammount), 0);
      
        return {
          month: month,
          vgv: vgv,
        };
      })
    );

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
      });

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
      });

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
      ticket_medium: ticket_medium,
      comission: {
        total: total_comissions,
        months: comissions_for_month
      },
      vgv: {
        total: vgv_total,
        quantity: QUANTITY_SALES,
        months: vgv_for_month,
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

export default SubsidiariesDashboardService;