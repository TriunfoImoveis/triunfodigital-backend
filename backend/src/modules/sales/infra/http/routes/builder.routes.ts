import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import BuilderController from '@modules/sales/infra/http/controllers/BuilderController';

const builderRouter = Router();
const builderController = new BuilderController();

builderRouter.get('/', builderController.index);

builderRouter.post('/', ensuredAthenticated, celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    cnpj: Joi.string().pattern(/^[0-9]{14,14}$/).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{11,11}$/).required(),
    responsible: Joi.string().required(),
  },
}), builderController.create);

builderRouter.get('/:id', ensuredAthenticated, celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
}), builderController.show);

builderRouter.put('/:id', ensuredAthenticated, celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
  [Segments.BODY]: {
    name: Joi.string(),
    cnpj: Joi.string().pattern(/^[0-9]{14,14}$/),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^[0-9]{11,11}$/),
    responsible: Joi.string(),
  }
}), builderController.update);

builderRouter.patch('/deactivate/:id', ensuredAthenticated, celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
}), builderController.deactivate);

builderRouter.patch('/activate/:id', ensuredAthenticated, celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  }
}), builderController.activate);

export default builderRouter;
