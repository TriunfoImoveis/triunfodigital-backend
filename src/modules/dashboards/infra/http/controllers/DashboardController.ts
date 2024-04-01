import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SellersDashboardService from '@modules/dashboards/services/SellersDashboardService';
import SubsidiariesDashboardService from '@modules/dashboards/services/SubsidiariesDashboardService';
import MKTDashboardService from '@modules/dashboards/services/MKTDashboardService';
import { IRequestDashboardFinancesDTO } from '@modules/dashboards/dtos/IRequestDashboardFinancesDTO';
import ListInstallmentService from '@modules/finances/services/ListInstallmentService';
import FinancesDashboardService from '@modules/dashboards/services/FinancesDashboardService';

class DashboardController {
  async dashboard_sellers(request: Request, response: Response): Promise<Response> {
    const {
      user,
      ano,
    } = request.query;

    const sellerDashboardService = container.resolve(SellersDashboardService);
    const sellerDashboard = await sellerDashboardService.execute({
      corretor: user as string,
      ano: Number(ano),
    });

    return response.json(sellerDashboard);
  }

  async dashboard_subsidiaries(request: Request, response: Response): Promise<Response> {
    const {
      subsidiary,
      year,
    } = request.query;

    const subsidiariesDashboardService = container.resolve(SubsidiariesDashboardService);
    const subsidiariesDashboard = await subsidiariesDashboardService.execute({
      subsidiary: subsidiary as string,
      year: Number(year),
    });

    return response.json(subsidiariesDashboard);
  }

  async dashboard_mkt(request: Request, response: Response): Promise<Response> {
    const sellerDashboardService = container.resolve(MKTDashboardService);
    const sellerDashboard = await sellerDashboardService.execute();

    return response.json(sellerDashboard);
  }

  async dashboard_finances(request: Request<never, never, never, IRequestDashboardFinancesDTO>, response: Response): Promise<Response<IRequestDashboardFinancesDTO>> {

    const financesDashboardService = container.resolve(FinancesDashboardService);
    const dashboardFinances = await financesDashboardService.execute(request.query);

    return response.json(dashboardFinances);
  }
}

export default DashboardController;
