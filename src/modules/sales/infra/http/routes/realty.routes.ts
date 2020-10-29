import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import RealtyController from '@modules/sales/infra/http/controllers/RealtyController';


const realtyRoutes = Router();
const realtyController = new RealtyController();

realtyRoutes.get('/', realtyController.index);

realtyRoutes.use(ensuredAthenticated);

realtyRoutes.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid(),
  }
}), realtyController.show);

// realtyRoutes.post('/', celebrate({
//   [Segments.BODY]: {
//     enterprise: Joi.string().required(),
//     unit: Joi.string().required(),
//     state: Joi.string().required(),
//     city: Joi.string().required(),
//     neighborhood: Joi.string().required(),
//     property: Joi.string().uuid().required(),
//   }
// }), realtyController.create);

export default realtyRoutes;
