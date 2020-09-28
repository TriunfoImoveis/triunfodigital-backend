import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SubsidiaryController from '@modules/users/infra/http/controllers/SubsidiaryController';

const subsidiaryRouter = Router();
const subsidiaryController = new SubsidiaryController();

subsidiaryRouter.get('/', subsidiaryController.index);

subsidiaryRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    goal: Joi.number().required(),
  }
}),subsidiaryController.create);

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
  }
}), subsidiaryController.update);

subsidiaryRouter.delete('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  }
}), subsidiaryController.delete);

export default subsidiaryRouter;
