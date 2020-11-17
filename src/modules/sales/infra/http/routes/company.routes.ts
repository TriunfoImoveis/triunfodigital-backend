import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import CompanyController from '@modules/sales/infra/http/controllers/CompanyController';

const companyRouter = Router();
const companyController = new CompanyController();

companyRouter.get('/', companyController.index);

companyRouter.use(ensuredAthenticated);

companyRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    percentage: Joi.string().required(),
  }
}), companyController.create);

companyRouter.put('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  }
}), companyController.update);

companyRouter.patch('/activate/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  }
}), companyController.activate);

companyRouter.patch('/deactivate/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  }
}), companyController.deactivate);

export default companyRouter;
