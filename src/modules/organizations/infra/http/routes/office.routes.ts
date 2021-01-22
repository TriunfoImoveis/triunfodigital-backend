import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import OfficeController from '@modules/organizations/infra/http/controllers/OfficeController';
import ensuredAuthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import validatorFields from '@shared/infra/http/validators/validatorFields';

const officeRouter = Router();
const officeController = new OfficeController();

officeRouter.get('/', officeController.index);

officeRouter.use(ensuredAuthenticated);

officeRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required()
        .messages(validatorFields({name: "'nome'"})),
    },
  }),
  officeController.create,
);

officeRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid(),
    },
  }),
  officeController.show,
);

officeRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid(),
    },
    [Segments.BODY]: {
      name: Joi.string().messages(validatorFields({name: "'nome'"})),
      active: Joi.boolean().messages(validatorFields({name: "'ativo'"})),
    },
  }),
  officeController.update,
);

// officeRouter.delete(
//   '/:id',
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.string().uuid(),
//     },
//   }),
//   officeController.delete,
// );

export default officeRouter;
