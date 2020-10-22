import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import PropertyController from '@modules/sales/infra/http/controllers/PropertyController';


const propertyRoutes = Router();
const propertyController = new PropertyController();

propertyRoutes.get('/', propertyController.index);

propertyRoutes.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  }
}), propertyController.create);

propertyRoutes.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  }
}), propertyController.show);

export default propertyRoutes;
