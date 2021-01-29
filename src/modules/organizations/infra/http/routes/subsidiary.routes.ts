import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SubsidiaryController from '@modules/organizations/infra/http/controllers/SubsidiaryController';
import ensuredAuthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import validatorFields from '@shared/infra/http/validators/validatorFields';

const subsidiaryRouter = Router();
const subsidiaryController = new SubsidiaryController();


subsidiaryRouter.get('/', subsidiaryController.index);

subsidiaryRouter.use(ensuredAuthenticated);

subsidiaryRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required()
      .messages(validatorFields({name: "'nome'"})),
    goal: Joi.number().positive().required()
      .messages(validatorFields({name: "'meta'"})),
    city: Joi.string().required()
      .messages(validatorFields({name: "'cidade'"})),
    state: Joi.string().length(2).uppercase().required()
      .messages(validatorFields({name: "'estado'", max: 2})),
    country: Joi.string().required()
      .messages(validatorFields({name: "'país'"})),
  }
}), subsidiaryController.create);

subsidiaryRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  }
}), subsidiaryController.show);

subsidiaryRouter.put('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
  [Segments.BODY]: {
    name: Joi.string()
      .messages(validatorFields({name: "'nome'"})),
    goal: Joi.number().positive()
      .messages(validatorFields({name: "'meta'"})),
    city: Joi.string()
      .messages(validatorFields({name: "'cidade'"})),
    state: Joi.string().length(2).uppercase()
      .messages(validatorFields({name: "'estado'", max: 2})),
    country: Joi.string()
      .messages(validatorFields({name: "'país'"})),
    active: Joi.boolean()
      .messages(validatorFields({name: "'ativo'"})),
  }
}), subsidiaryController.update);

// subsidiaryRouter.delete('/:id', celebrate({
//   [Segments.PARAMS]: {
//     id: Joi.string().uuid(),
//   }
// }), subsidiaryController.delete);

export default subsidiaryRouter;
