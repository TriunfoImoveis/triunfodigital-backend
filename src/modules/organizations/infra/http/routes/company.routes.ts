import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import CompanyController from '@modules/organizations/infra/http/controllers/CompanyController';

const companyRouter = Router();
const companyController = new CompanyController();

companyRouter.get('/', companyController.index);

companyRouter.use(ensuredAthenticated);

companyRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  }
}), companyController.show);

companyRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    cnpj: Joi.string().pattern(/^[0-9]{14,14}$/).required(),
  }
}), companyController.create);

companyRouter.put('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
  [Segments.BODY]: {
    name: Joi.string(),
    cnpj: Joi.string().pattern(/^[0-9]{14,14}$/),
    active: Joi.boolean(),
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
