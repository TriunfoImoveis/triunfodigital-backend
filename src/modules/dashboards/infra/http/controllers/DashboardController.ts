import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SellersDashboardService from '@modules/dashboards/services/SellersDashboardService';
import SubsidiariesDashboardService from '@modules/dashboards/services/SubsidiariesDashboardService';

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
}

export default DashboardController;