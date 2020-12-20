import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import MotiveController from '@modules/sales/infra/http/controllers/MotiveController';


const motiveRoutes = Router();
const motiveController = new MotiveController();

motiveRoutes.get('/', motiveController.index);

motiveRoutes.use(ensuredAthenticated);

motiveRoutes.post('/', celebrate({
  [Segments.BODY]: {
    description: Joi.string().required(),
  }
}), motiveController.create);

export default motiveRoutes;
