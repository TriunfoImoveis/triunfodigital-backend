import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import OriginController from '@modules/sales/infra/http/controllers/OriginController';


const originRoutes = Router();
const originController = new OriginController();

originRoutes.get('/', originController.index);

originRoutes.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  }
}), originController.create);

originRoutes.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  }
}), originController.show);

export default originRoutes;
