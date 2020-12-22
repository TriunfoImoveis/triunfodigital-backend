import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuredAthenticated from '@shared/infra/http/middlewares/ensuredAuthenticated';
import PaymentTypeController from '@modules/sales/infra/http/controllers/PaymentTypeController';


const paymentTypeRoutes = Router();
const paymentTypeController = new PaymentTypeController();

paymentTypeRoutes.get('/', celebrate({
  [Segments.QUERY]: {
    type: Joi.string().valid('NOVO', 'USADO').required(),
  }
}), paymentTypeController.index);

paymentTypeRoutes.use(ensuredAthenticated);

paymentTypeRoutes.post('/', celebrate({
  [Segments.BODY]: {
    type: Joi.string().valid(
      'NOVO', 'USADO'
    ).required(),
    name: Joi.string().required(),
    status: Joi.string().valid(
      'TOTAL', 'PARCELADO'
    ).required(),
  }
}), paymentTypeController.create);

export default paymentTypeRoutes;
