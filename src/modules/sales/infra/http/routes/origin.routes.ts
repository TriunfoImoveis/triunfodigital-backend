import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import OriginController from '@modules/sales/infra/http/controllers/OriginController';


const originRoutes = Router();
const originController = new OriginController();

originRoutes.get('/', originController.index);

originRoutes.use(ensuredAthenticated);

originRoutes.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  }
}), originController.create);

export default originRoutes;
