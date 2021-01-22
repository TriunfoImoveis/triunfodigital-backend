import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import PropertyController from '@modules/sales/infra/http/controllers/PropertyController';
import validatorFields from '@shared/infra/http/validators/validatorFields';


const propertyRoutes = Router();
const propertyController = new PropertyController();

propertyRoutes.get('/', propertyController.index);

propertyRoutes.use(ensuredAthenticated);

propertyRoutes.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required()
      .messages(validatorFields({name: "'nome'"})),
  }
}), propertyController.create);

export default propertyRoutes;
