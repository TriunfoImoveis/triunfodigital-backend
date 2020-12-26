import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SubsidiaryController from '@modules/organizations/infra/http/controllers/SubsidiaryController';
import ensuredAuthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';

const subsidiaryRouter = Router();
const subsidiaryController = new SubsidiaryController();


subsidiaryRouter.get('/', subsidiaryController.index);

subsidiaryRouter.use(ensuredAuthenticated);

subsidiaryRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    goal: Joi.number().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
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
    name: Joi.string(),
    goal: Joi.number(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
    active: Joi.boolean(),
  }
}), subsidiaryController.update);

// subsidiaryRouter.delete('/:id', celebrate({
//   [Segments.PARAMS]: {
//     id: Joi.string().uuid(),
//   }
// }), subsidiaryController.delete);

export default subsidiaryRouter;
