import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import OriginController from '@modules/sales/infra/http/controllers/OriginController';
import validatorFields from '@shared/infra/http/validators/validatorFields';


const originRoutes = Router();
const originController = new OriginController();

originRoutes.get('/', originController.index);

originRoutes.use(ensuredAthenticated);

originRoutes.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required()
      .messages(validatorFields({name: "'nome'"})),
  }
}), originController.create);
originRoutes.post('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  }
}), originController.delete);

export default originRoutes;
