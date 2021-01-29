import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import CompanyController from '@modules/organizations/infra/http/controllers/CompanyController';
import validatorFields from '@shared/infra/http/validators/validatorFields';

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
    name: Joi.string().required()
      .messages(validatorFields({name: "'nome'"})),
    cnpj: Joi.string().pattern(/^[0-9]{14,14}$/).required()
      .messages(validatorFields({name: "'cnpj'", max: 14})),
  }
}), companyController.create);

companyRouter.put('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
  [Segments.BODY]: {
    name: Joi.string()
      .messages(validatorFields({name: "'nome'"})),
    cnpj: Joi.string().pattern(/^[0-9]{14,14}$/)
      .messages(validatorFields({name: "'cnpj'", max: 14})),
    active: Joi.boolean()
      .messages(validatorFields({name: "'ativo'"})),
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
