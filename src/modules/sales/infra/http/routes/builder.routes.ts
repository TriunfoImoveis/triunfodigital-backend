import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import BuilderController from '@modules/sales/infra/http/controllers/BuilderController';
import validatorFields from '@shared/infra/http/validators/validatorFields';

const builderRouter = Router();
const builderController = new BuilderController();

builderRouter.get('/', celebrate({
  [Segments.QUERY]: {
    name: Joi.string().default(''),
    uf: Joi.string().length(2).uppercase().required(),
    city: Joi.string().default('%'),
  }
}), builderController.index);

builderRouter.use(ensuredAthenticated);

builderRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required()
      .messages(validatorFields({name: "'nome'"})),
    cnpj: Joi.string().pattern(/^[0-9]{14,14}$/).required()
      .messages(validatorFields({name: "'cnpj'", max: 14})),
    email: Joi.string().email().required()
      .messages(validatorFields({name: "'email'"})),
    phone: Joi.string().pattern(/^[0-9]{11,11}$/).required()
      .messages(validatorFields({name: "'telefone'", max: 11})),
    responsible: Joi.string().required()
      .messages(validatorFields({name: "'responsável'"})),
    state: Joi.string().length(2).uppercase().required()
      .messages(validatorFields({name: "'estado'", max: 2})),
    city: Joi.string().required()
      .messages(validatorFields({name: "'cidade'"})),
  },
}), builderController.create);

builderRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
}), builderController.show);

builderRouter.put('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
  [Segments.BODY]: {
    name: Joi.string()
      .messages(validatorFields({name: "'nome'"})),
    cnpj: Joi.string().pattern(/^[0-9]{14,14}$/)
      .messages(validatorFields({name: "'cnpj'", max: 14})),
    email: Joi.string().email()
      .messages(validatorFields({name: "'email'"})),
    phone: Joi.string().pattern(/^[0-9]{11,11}$/)
      .messages(validatorFields({name: "'telefone'", max: 11})),
    responsible: Joi.string()
      .messages(validatorFields({name: "'responsável'"})),
    state: Joi.string().length(2).uppercase()
      .messages(validatorFields({name: "'estado'", max: 2})),
    city: Joi.string()
      .messages(validatorFields({name: "'cidade'"})),
    active: Joi.boolean()
      .messages(validatorFields({name: "'ativo'"})),
  }
}), builderController.update);

builderRouter.patch('/deactivate/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
}), builderController.deactivate);

builderRouter.patch('/activate/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  }
}), builderController.activate);

builderRouter.get('/export/excel',celebrate({
  [Segments.QUERY]: {
    uf: Joi.string().allow(''),
  }
}), builderController.exportExcel);

export default builderRouter;
