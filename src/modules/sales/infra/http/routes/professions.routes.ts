import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfessionController from '../controllers/ProfessionController';

const professionRouter = Router();
const professionController = new ProfessionController();
import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';

professionRouter.use(ensuredAthenticated);

professionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  professionController.create,
);

professionRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      active: Joi.string().valid('true', 'false', '').optional(),
    },
  }),
  professionController.index,
);

professionRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  professionController.show,
);

professionRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      active: Joi.boolean(),
    },
  }),
  professionController.update,
);

export default professionRouter;
