import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import MotiveController from '@modules/sales/infra/http/controllers/MotiveController';
import validatorFields from '@shared/infra/http/validators/validatorFields';


const motiveRoutes = Router();
const motiveController = new MotiveController();

motiveRoutes.get('/', motiveController.index);

motiveRoutes.use(ensuredAthenticated);

motiveRoutes.post('/', celebrate({
  [Segments.BODY]: {
    description: Joi.string().required()
      .messages(validatorFields({name: "'descrição'"})),
  }
}), motiveController.create);

export default motiveRoutes;
