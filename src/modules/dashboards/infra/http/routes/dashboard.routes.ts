import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import DashboardController from '@modules/dashboards/infra/http/controllers/DashboardController';
import { equal } from 'joi';

const dashboardRouter = Router();
const dashboardController = new DashboardController();

const CURRENT_YEAR = new Date().getFullYear()

dashboardRouter.get('/sellers', celebrate({
  [Segments.QUERY]: {
    user: Joi.string().uuid().required(),
    ano: Joi.number().min(2020).max(CURRENT_YEAR).default(CURRENT_YEAR),
  },
}), dashboardController.dashboard_sellers);

dashboardRouter.get('/subsidiaries', celebrate({
  [Segments.QUERY]: {
    subsidiary: Joi.string().uuid().required(),
    year: Joi.number().min(2020).max(CURRENT_YEAR).default(CURRENT_YEAR),
  },
}), dashboardController.dashboard_subsidiaries);
dashboardRouter.get('/finances', celebrate({
  [Segments.QUERY]: {
    subsidiary: Joi.string().uuid().default('').allow(''),
    month: Joi.string().default('').allow(''),
    year: Joi.string().default('').allow(''),
    dateFrom: Joi.date().iso().allow(''),
    dateTo: Joi.date().iso().allow(''),
  },
}), dashboardController.dashboard_finances);

dashboardRouter.get('/mkt/sales', dashboardController.dashboard_mkt)

export default dashboardRouter;
