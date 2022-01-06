import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SellersDashboardService from '@modules/dashboards/services/SellersDashboardService';

class SellerDashboardController {
    async index(request: Request, response: Response): Promise<Response> {
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
}

export default SellerDashboardController;