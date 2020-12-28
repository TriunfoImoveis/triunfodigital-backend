import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import DepartamentController from '@modules/organizations/infra/http/controllers/DepartamentController';
import ensuredAuthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';

const departamentRouter = Router();
const departamentController = new DepartamentController();

departamentRouter.get('/', celebrate({
  [Segments.QUERY]: {
    subsidiary: Joi.string().required(),
  }
}), departamentController.index);

departamentRouter.use(ensuredAuthenticated);

departamentRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    initials: Joi.string().required(),
    goal: Joi.number(),
    subsidiary: Joi.string().uuid().required(),
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
    subsidiary: Joi.string().uuid(),
    active: Joi.boolean(),
  }
}), departamentController.update);

// departamentRouter.delete('/:id', celebrate({
//   [Segments.PARAMS]: {
//     id: Joi.string().uuid(),
//   }
// }), departamentController.delete);

export default departamentRouter;