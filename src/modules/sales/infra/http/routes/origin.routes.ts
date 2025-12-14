import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import OriginController from '@modules/sales/infra/http/controllers/OriginController';
import validatorFields from '@shared/infra/http/validators/validatorFields';


const originRoutes = Router();
const originController = new OriginController();

originRoutes.get('/', celebrate({
  [Segments.QUERY]: {
    client: Joi.boolean(),
    channel: Joi.boolean(),
  }
}), originController.index);
originRoutes.get('/all', originController.showAll);

originRoutes.use(ensuredAthenticated);

originRoutes.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required()
      .messages(validatorFields({name: "'nome'"})),
    isOriginClient: Joi.boolean().default(false),
    isOriginChannel: Joi.boolean().default(false),
  }
}), originController.create);

originRoutes.put('/update/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
  [Segments.BODY]: {
    name: Joi.string().required()
      .messages(validatorFields({name: "'nome'"})),
    isOriginClient: Joi.boolean().default(false),
    isOriginChannel: Joi.boolean().default(false),
  }
}), originController.update);

originRoutes.put('/active/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  }
}), originController.activate);

originRoutes.put('/deactivate/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  }
}), originController.deactivate);

export default originRoutes;
