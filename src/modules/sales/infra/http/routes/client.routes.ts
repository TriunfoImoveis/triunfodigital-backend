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
      cpf: Joi.string().pattern(/^[0-9]{11,11}$/),
      cnpj: Joi.string().pattern(/^[0-9]{14,14}$/),
      email: Joi.string().email().required(),
      phone: Joi.string().pattern(/^[0-9]{11,11}$/),
      whatsapp: Joi.string().pattern(/^[0-9]{10,14}$/),
      date_birth: Joi.date(),
      occupation: Joi.string(),
      profession_id: Joi.string().uuid(),
      origin_id: Joi.string().uuid(),
      civil_status: Joi.string().valid(
        'CASADO(A)',
        'DIVORCIADO(A)',
        'SOLTEIRO(A)',
        'VIUVO(A)',
      ),
      number_children: Joi.number().integer().min(0),
      gender: Joi.string().valid('MASCULINO', 'FEMININO', 'OUTRO'),
      address: Joi.string(),
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
      cnpj: Joi.string().pattern(/^[0-9]{14,14}$/),
      email: Joi.string().email(),
      phone: Joi.string().pattern(/^[0-9]{11,11}$/),
      whatsapp: Joi.string().pattern(/^[0-9]{10,14}$/),
      date_birth: Joi.date(),
      occupation: Joi.string(),
      profession_id: Joi.string().uuid(),
      origin_id: Joi.string().uuid(),
      civil_status: Joi.string().valid('C', 'D', 'S', 'V'),
      number_children: Joi.number().integer().min(0),
      gender: Joi.string().valid('M', 'F', 'O'),
      address: Joi.string(),
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
