import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import DepartamentController from '@modules/users/infra/http/controllers/DepartamentController';

const departamentRouter = Router();
const departamentController = new DepartamentController();

departamentRouter.get('/', departamentController.index);

departamentRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    initials: Joi.string(),
    goal: Joi.number(),
    subsidiary_id: Joi.string().uuid().required(),
  }
}), departamentController.create);

departamentRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  }
}), departamentController.show);

departamentRouter.put('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
  [Segments.BODY]: {
    name: Joi.string(),
    initials: Joi.string(),
    goal: Joi.number(),
    subsidiary_id: Joi.string().uuid(),
  }
}), departamentController.update);

departamentRouter.delete('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  }
}), departamentController.delete);

export default departamentRouter;
