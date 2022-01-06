import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { getYear } from 'date-fns';

import SellerDashboardController from '@modules/dashboards/infra/http/controllers/SellerDashboardController';

const dashboardRouter = Router();
const sellerDashboardController = new SellerDashboardController();

const CURRENT_YAER = new Date().getFullYear()

dashboardRouter.get('/sellers', celebrate({
    [Segments.QUERY]: {
        user: Joi.string().uuid().required(),
        ano: Joi.number().min(2020).max(CURRENT_YAER).default(CURRENT_YAER),
    },
}), sellerDashboardController.index);

export default dashboardRouter;
