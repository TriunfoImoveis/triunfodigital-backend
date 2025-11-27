import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import ClientController from '@modules/sales/infra/http/controllers/ClientController';

const clientRouter = Router();
const clientController = new ClientController();

clientRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      cpf: Joi.string().pattern(/^[0-9]{11,11}$/),
      cnpj: Joi.string().pattern(/^[0-9]{14,14}$/),
    },
  }),
  clientController.index,
);

clientRouter.use(ensuredAthenticated);

clientRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cpf: Joi.string()
        .pattern(/^[0-9]{11,11}$/)
        .required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(/^[0-9]{11,11}$/)
        .required(),
      date_birth: Joi.date().required(),
      profession_id: Joi.string().uuid().required(),
      civil_status: Joi.string()
        .valid('CASADO(A)', 'DIVORCIADO(A)', 'SOLTEIRO(A)', 'VIUVO(A)')
        .required(),
      number_children: Joi.number().integer().min(0).required(),
      gender: Joi.string().valid('MASCULINO', 'FEMININO').required(),
    },
  }),
  clientController.create,
);

clientRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid(),
    },
  }),
  clientController.show,
);

clientRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      cpf: Joi.string().pattern(/^[0-9]{11,11}$/),
      email: Joi.string().email(),
      phone: Joi.string().pattern(/^[0-9]{11,11}$/),
      date_birth: Joi.date(),
      profession_id: Joi.string().uuid(),
      civil_status: Joi.string().valid('C', 'D', 'S', 'V'),
      number_children: Joi.number().integer().min(0),
      gender: Joi.string().valid('M', 'F', 'O'),
    },
  }),
  clientController.update,
);

clientRouter.patch(
  '/deactivate/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid(),
    },
  }),
  clientController.deactivate,
);

clientRouter.patch(
  '/activate/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid(),
    },
  }),
  clientController.activate,
);

export default clientRouter;
