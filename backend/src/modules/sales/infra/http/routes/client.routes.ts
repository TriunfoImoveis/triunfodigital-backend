import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import ClientController from '@modules/sales/infra/http/controllers/ClientController';

const clientRouter = Router();
const clientController = new ClientController();

clientRouter.use(ensuredAthenticated);

clientRouter.get('/', clientController.index);

clientRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    cpf: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    date_birth: Joi.date().required(),
    occupation: Joi.string().required(),
    civil_status: Joi.string().required(),
    number_children: Joi.number().required(),
    gender: Joi.string().required(),
  }
}), clientController.create);

clientRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  }
}), clientController.show);

clientRouter.put('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  },
  [Segments.BODY]: {
    name: Joi.string(),
    cpf: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    date_birth: Joi.date(),
    occupation: Joi.string(),
    civil_status: Joi.string(),
    number_children: Joi.number(),
    gender: Joi.string(),
  }
}), clientController.update);

clientRouter.delete('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  }
}), clientController.delete);

export default clientRouter;
